'use strict';

// Curated overrides for common English words
var OVERRIDES = {
  // Greetings
  'hello': "Su cuy'gar", 'hi': "Su'cuy", 'goodbye': "Ret'urcye mhi", 'bye': "Ret'",
  'thanks': "vor'e", 'thank': "vor'e",
  // Pronouns
  'i': 'ni', 'me': 'ni', 'my': 'ner', 'mine': 'ner',
  'we': 'mhi', 'us': 'mhi', 'our': 'cuun',
  'you': 'gar', 'your': 'gar',
  'he': 'kaysh', 'him': 'kaysh', 'his': 'kaysh',
  'she': 'kaysh', 'her': 'kaysh',
  'they': 'val', 'them': 'val', 'their': 'val',
  'it': 'bic', 'its': 'bic',
  // Question words
  'what': 'tion', 'how': 'tion', 'who': 'tionmeg',
  // Articles -- dropped in Mando'a (no articles exist)
  'a': '', 'an': '',
  // Connectors
  'the': 'te', 'this': 'ibic', 'that': 'ibac',
  'and': 'bal', 'or': 'ra', 'but': 'a',
  'with': 'ti', 'from': 'teh', 'for': 'par',
  'on': 'bat', 'to': 'at', 'of': 'be',
  'in': "o'r", 'by': 'de', 'about': 'par',
  'here': 'olar', 'there': 'ogir',
  'not': 'ne', 'no': 'nayc', 'yes': 'elek',
  'all': 'an', 'never': 'draar', 'always': 'ratiin',
  // Verbs
  'is': 'cuyir', 'am': 'cuyir', 'are': 'cuyir', 'be': 'cuyir', 'was': 'cuyir', 'were': 'cuyir',
  'will': 'ven', 'would': 'ven', 'shall': 'ven',
  'have': 'ganar', 'has': 'ganar', 'do': 'narir', 'did': 'narir',
  'can': 'liser', 'could': 'liser',
  'want': 'copaanir', 'need': 'linibar',
  'know': "kar'taylir", 'think': 'mirdir',
  'see': "haa'taylir", 'hear': 'susulur',
  'say': 'sirbur', 'speak': "jorhaa'ir", 'tell': "rejorhaa'ir",
  'give': 'dinuir', 'fight': 'akaanir',
  'run': 'viinir', 'live': "oyacyir", 'die': "ash'amur",
  'eat': 'epar', 'drink': 'pirur', 'sleep': 'nuhoy',
  'go': 'slanar', 'come': 'olar', 'believe': 'urmankalar',
  'love': "kar'taylir darasuum", 'like': 'emuurir',
  'find': 'akior', 'found': 'akior',
  'wait': 'parer', 'stand': 'motir', 'sit': 'sheber',
  'hope': 'vercopaanir', 'wish': 'vercopaanir',
  'let': 'liser', 'open': 'tenn',
  // Common nouns / adjectives
  'good': 'jate', 'bad': 'nuhoyir', 'strong': 'dral',
  'brave': 'kotep', 'new': "evaar'la", 'fast': "iviin'yc",
  'old': "ruug'la", 'young': "evaar'la",
  'dark': 'dha', 'light': 'nau',
  'friend': "burc'ya", 'day': 'tuur', 'today': "ibi'tuur",
  'name': 'gai', 'home': 'yaim', 'world': 'uvet',
  'star': 'kar', 'water': 'pirun', 'blood': 'tal',
  'heart': "kar'ta", 'brother': 'vod', 'sister': 'vod',
  'child': 'ad', 'parent': 'buir', 'father': 'buir', 'mother': 'buir',
  'war': 'akaan', 'death': "kyr'am", 'enemy': "aru'e",
  'help': "gaa'tayl", 'way': 'ara', 'year': 'simir',
  'builder': "gotal'ad", 'maker': "gotal'ad", 'creator': "gotal'ad",
  'build': "gotal'ur", 'make': "gotal'ur", 'create': "gotal'ur",
  'born': 'goten', 'birth': 'goten',
  'peace': 'naak', 'justice': 'tor',
  'side': 'eso', 'power': 'kotla',
};

// Contractions to expand before word-by-word translation
var CONTRACTIONS = {
  "i'm": 'i am',
  "i'd": 'i would',
  "i've": 'i have',
  "i'll": 'i will',
  "we're": 'we are',
  "we've": 'we have',
  "we'll": 'we will',
  "you're": 'you are',
  "you've": 'you have',
  "you'll": 'you will',
  "he's": 'he is',
  "she's": 'she is',
  "it's": 'it is',
  "they're": 'they are',
  "they've": 'they have',
  "they'll": 'they will',
  "that's": 'that is',
  "there's": 'there is',
  "here's": 'here is',
  "don't": 'do not',
  "doesn't": 'does not',
  "didn't": 'did not',
  "can't": 'can not',
  "couldn't": 'could not',
  "won't": 'will not',
  "wouldn't": 'would not',
  "shouldn't": 'should not',
  "isn't": 'is not',
  "aren't": 'are not',
  "wasn't": 'was not',
  "weren't": 'were not',
  "hasn't": 'has not',
  "haven't": 'have not',
  "let's": 'let us',
  // 's contractions (who's, what's, where's, etc.)
  "who's": 'who is',
  "what's": 'what is',
  "where's": 'where is',
  "when's": 'when is',
  "how's": 'how is',
  "why's": 'why is',
  "nobody's": 'nobody is',
  "everyone's": 'everyone is',
  "somebody's": 'somebody is',
  // 'll contractions
  "that'll": 'that will',
  "there'll": 'there will',
  "who'll": 'who will',
  "what'll": 'what will',
  "it'll": 'it will',
  // 'd contractions
  "who'd": 'who would',
  "what'd": 'what did',
  "where'd": 'where did',
  "how'd": 'how did',
  // 've contractions
  "might've": 'might have',
  "should've": 'should have',
  "could've": 'could have',
  "would've": 'would have',
  "must've": 'must have',
  // Informal / slang contractions
  "ain't": 'is not',
  "y'all": 'you all',
  "gonna": 'going to',
  "wanna": 'want to',
  "gotta": 'got to',
  "kinda": 'kind of',
  "lemme": 'let me',
  "gimme": 'give me',
  "c'mon": 'come on',
};

// Curated phrase overrides for common expressions
var PHRASE_OVERRIDES = {
  "what's your name": 'Tion gar gai?',
  "how are you": "Me'vaar ti gar?",
  "what's happening": "Me'bana?",
  "what happened": "Me'bana?",
  "what do you want": "Me'copaani?",
  "happy birthday": "Briikase gote'tuur!",
  "you're welcome": "Ba'gedet'ye!",
  "come here": "K'olar!",
  "go away": "Usen'ye!",
  "get lost": "Slana'pir!",
  "get out": "Slana'pir!",
  "shut up": "Ne'johaa!",
  "damn it": "Haar'chak!",
  "hang on": 'Pare!',
  "well done": 'Kandosii!',
  "nice one": 'Kandosii!',
  "no problem": "Kih'parjai.",
  "take it easy": 'Udesii!',
  "calm down": 'Udesii!',
  "good grief": 'Wayii!',
  "at last": "Mar'e!",
  "thank you": 'Vor entye.',
  "thanks a lot": "Ori'vor'e!",
  "i'm sorry": "N'eparavu takisit.",
  "sorry": "N'eparavu takisit.",
  "how many": "Tion'solet?",
  "how much": "Tion'solet?",
  "dead or alive": 'oyayc ra kyrayc',
  "the best of the best": 'jatnese be jatnese',
  "hello": "Su cuy'gar",
};

// Strip trailing punctuation from a phrase value
function cleanPhraseValue(val) {
  return val.replace(/[.!?]+$/, '');
}

function buildPhraseLookup(dict) {
  var phrases = new Map();

  // Add curated phrase overrides first (cleaned)
  var key;
  for (key in PHRASE_OVERRIDES) {
    phrases.set(key.toLowerCase(), cleanPhraseValue(PHRASE_OVERRIDES[key]));
  }

  // Extract usable phrases from dictionary
  for (var i = 0; i < dict.length; i++) {
    var mandoa = dict[i][0];
    var english = dict[i][1];
    var type = dict[i][3];

    if (type !== 'phrase') continue;

    // Clean the English side: take text before common delimiters
    var clean = english
      .replace(/\(lit\..*/, '')
      .replace(/\(.*?\)/g, '')
      .replace(/ - .*/, '')
      .replace(/\*.*?\*/g, '')
      .replace(/[.!?]+$/, '')
      .trim();

    if (!clean || clean.length < 3) continue;

    // Skip very long phrases (proverbs, sayings) -- keep short usable ones
    if (clean.split(/\s+/).length > 6) continue;

    var phraseKey = clean.toLowerCase();
    if (!phrases.has(phraseKey)) {
      // Clean trailing punctuation from the Mando'a value too
      phrases.set(phraseKey, cleanPhraseValue(mandoa));
    }
  }

  return phrases;
}

function buildLookup(dict) {
  var autoLookup = new Map();

  for (var i = 0; i < dict.length; i++) {
    var mandoa = dict[i][0];
    var english = dict[i][1];
    var type = dict[i][3];

    if (type === 'phrase') continue;

    // Split on commas, semicolons, AND dashes with spaces
    var parts = english.toLowerCase().split(/[,;]| - /).map(function (s) {
      return s.trim();
    });

    for (var j = 0; j < parts.length; j++) {
      var part = parts[j];

      // Strip 'to ' from verbs
      if (type === 'verb' && part.startsWith('to ')) {
        part = part.slice(3);
      }

      // Strip parenthetical notes
      part = part.replace(/\(.*?\)/g, '').trim();

      // Only index single-word definitions
      if (part.split(/\s+/).length === 1 && part.length > 1) {
        if (!autoLookup.has(part)) {
          autoLookup.set(part, mandoa);
        }
      }
    }
  }

  // Apply overrides on top of auto-extracted entries
  var key;
  for (key in OVERRIDES) {
    autoLookup.set(key, OVERRIDES[key]);
  }

  return autoLookup;
}

function expandContractions(input) {
  // Normalize curly quotes to straight apostrophes
  var normalized = input.replace(/[\u2018\u2019\u201B\u0060]/g, "'");

  // Match apostrophe contractions (don't, I'm, etc.)
  var result = normalized.replace(/[a-zA-Z]+'[a-zA-Z]+/g, function (match) {
    var lower = match.toLowerCase();
    if (CONTRACTIONS[lower]) {
      return CONTRACTIONS[lower];
    }
    return match;
  });

  // Match slang/informal contractions without apostrophes (gonna, wanna, etc.)
  result = result.replace(/\b[a-zA-Z]+\b/g, function (match) {
    var lower = match.toLowerCase();
    if (CONTRACTIONS[lower]) {
      return CONTRACTIONS[lower];
    }
    return match;
  });

  return result;
}

// Placeholder system to protect phrase-matched segments from word-by-word
var PLACEHOLDER_PREFIX = '\x00PH';
var PLACEHOLDER_SUFFIX = '\x00';

function translate(input, lookup, phraseLookup) {
  // Step 1: Normalize curly quotes
  var text = input.replace(/[\u2018\u2019\u201B\u0060]/g, "'");

  // Step 2: Phrase matching (longest first)
  // Replace matched phrases with placeholders to protect from word-by-word
  var phraseReplacements = [];

  if (phraseLookup) {
    var phraseKeys = Array.from(phraseLookup.keys()).sort(function (a, b) {
      return b.length - a.length;
    });

    for (var i = 0; i < phraseKeys.length; i++) {
      var phrase = phraseKeys[i];
      var escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Word-boundary aware matching
      var regex = new RegExp('\\b' + escaped + '\\b', 'gi');

      if (regex.test(text)) {
        var replacement = phraseLookup.get(phrase);
        var placeholderId = phraseReplacements.length;
        phraseReplacements.push(replacement);
        var placeholder = PLACEHOLDER_PREFIX + placeholderId + PLACEHOLDER_SUFFIX;
        text = text.replace(regex, placeholder);
      }
    }
  }

  // Step 3: Expand contractions
  text = expandContractions(text);

  // Step 4: Word-by-word translation
  text = text.split(/(\s+)/).map(function (token) {
    if (/^\s+$/.test(token)) return token;

    // Skip placeholders
    if (token.indexOf(PLACEHOLDER_PREFIX) !== -1) return token;

    var match = token.match(/^([^a-zA-Z']*)([a-zA-Z']+)([^a-zA-Z']*)$/);
    if (!match) return token;

    var pre = match[1];
    var core = match[2];
    var post = match[3];
    var lower = core.toLowerCase();

    if (lookup.has(lower)) {
      return pre + lookup.get(lower) + post;
    }
    return token;
  }).join('');

  // Step 5: Restore placeholders with actual Mando'a phrases
  for (var j = 0; j < phraseReplacements.length; j++) {
    var ph = PLACEHOLDER_PREFIX + j + PLACEHOLDER_SUFFIX;
    text = text.replace(ph, phraseReplacements[j]);
  }

  // Step 6: Clean up double spaces from dropped articles
  text = text.replace(/  +/g, ' ').trim();

  return text;
}

module.exports = { buildLookup, buildPhraseLookup, translate };
