const COMMAND_PREFIX = 'mando';
const MAX_INPUT_LENGTH = 500;

const OPT_OUT_NOTICE = '\n\nReply STOP to opt out, HELP for info.';

const INTRO_MESSAGE =
  `Welcome to the Twilio Mando'a Translator! ` +
  `Translate any English phrase into the Mando'a language from Star Wars.\n\n` +
  `Text MANDO followed by your phrase to translate it.\n` +
  `Example: MANDO Hello World` +
  OPT_OUT_NOTICE;

// Load dictionary and translator once at cold start
let lookup = null;
let phraseLookup = null;

function init() {
  if (lookup) return;

  const dictPath = Runtime.getAssets()['/mandoa.json'].path;
  const dict = JSON.parse(require('fs').readFileSync(dictPath, 'utf8'));
  const translatorPath = Runtime.getAssets()['/translator.js'].path;
  const { buildLookup, buildPhraseLookup } = require(translatorPath);
  lookup = buildLookup(dict);
  phraseLookup = buildPhraseLookup(dict);
}

exports.handler = async function (context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();

  // Lookup: validate number and reject landlines/voicemail/pagers
  try {
    const client = context.getTwilioClient();
    const result = await client.lookups.v2.phoneNumbers(event.From).fetch({ fields: 'line_type_intelligence' });
    const lineType = result.lineTypeIntelligence?.type;
    if (['landline', 'voicemail', 'pager'].includes(lineType)) {
      return callback(null, twiml);
    }
  } catch (err) {
    console.error('Lookup failed:', err.message);
  }

  const inboundBody = (event.Body || '').trim();
  const command = inboundBody.toUpperCase();

  // Handle HELP keyword
  if (command === 'HELP') {
    twiml.message(
      `Twilio Mando'a Translator: Text MANDO followed by an English ` +
        `phrase to get it translated into Mando'a. ` +
        'Powered by Twilio. Translation made possible by the MandoCreator dictionary (mandocreator.com). ' +
        'Msg & data rates may apply. Reply STOP to opt out.'
    );
    return callback(null, twiml);
  }

  // Easter egg: check for codeword
  if (context.EASTER_EGG_CODEWORD && context.EASTER_EGG_MESSAGE) {
    const codeword = context.EASTER_EGG_CODEWORD.trim().toLowerCase();
    if (inboundBody.toLowerCase() === codeword) {
      twiml.message(context.EASTER_EGG_MESSAGE + OPT_OUT_NOTICE);
      return callback(null, twiml);
    }
  }

  // Check for MANDO prefix
  const lower = inboundBody.toLowerCase();
  if (!lower.startsWith(COMMAND_PREFIX)) {
    const intro = twiml.message();
    intro.body(INTRO_MESSAGE);
    intro.media(`https://${context.DOMAIN_NAME}/mando-banner.png`);
    return callback(null, twiml);
  }

  // Strip MANDO prefix and get the phrase to translate
  const textToTranslate = inboundBody.slice(COMMAND_PREFIX.length).trim().replace(/[^\x20-\x7E]/g, '');

  // MANDO with no phrase
  if (!textToTranslate) {
    twiml.message(
      `What would you like to translate? Text MANDO followed by a phrase.\n` +
        `Example: MANDO Hello World` +
        OPT_OUT_NOTICE
    );
    return callback(null, twiml);
  }

  // Cap input length
  if (textToTranslate.length > MAX_INPUT_LENGTH) {
    twiml.message(
      `That phrase is too long! Please keep it under ${MAX_INPUT_LENGTH} characters.` +
        OPT_OUT_NOTICE
    );
    return callback(null, twiml);
  }

  try {
    const translatorPath = Runtime.getAssets()['/translator.js'].path;
    const { translate } = require(translatorPath);
    init();
    const translated = translate(textToTranslate, lookup, phraseLookup);

    // Message 1: quick acknowledgment
    twiml.message("Translating into Mando'a...");

    // Message 2: formatted translation
    const message = twiml.message();
    message.body(
      `You said\n"${textToTranslate}"\n\n` +
        `but in Mando'a you would say\n"${translated}"` +
        OPT_OUT_NOTICE
    );
    return callback(null, twiml);
  } catch (err) {
    console.error('Translation failed:', err.message);
    twiml.message(
      'Something went wrong with the translation. Please try again later.' +
        OPT_OUT_NOTICE
    );
    return callback(null, twiml);
  }
};
