exports.handler = function (context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.say(
    { voice: 'Polly.Matthew' },
    'These are not the droids you are looking for. Please send an SMS to this number instead.'
  );
  twiml.hangup();
  return callback(null, twiml);
};
