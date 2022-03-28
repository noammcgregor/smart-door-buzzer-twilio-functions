exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  
  // Get rid of random non-alphabetical chars and put to lower case
  if (event.SpeechResult !== undefined) {
    var cleanString = event.SpeechResult.replace(/[^\w\s]|_/g, "")
          .replace(/\s+/g, " ");
      var cleanSpeechResult = cleanString.toLowerCase(); 
    } else {
      var cleanSpeechResult = " ";
    }
  
  console.log('Speech: ' + cleanSpeechResult + '; confidence: ' + event.Confidence)
  console.log('Digits: ' + event.Digits)
  
  if ( (cleanSpeechResult == context.PASSPHRASE && event.Confidence > 0.5) 
          || event.Digits == context.PASSCODE) {
    // Check if we have a password match, and open the door
    twiml.say({voice: 'man'}, 'Welcome! friend!')
    twiml.play({digits: '6666'}) // Pressing 9 sends DTFM tone to open the door
    twiml.pause({length:1})

    // Also send me a text on this 
    twiml.redirect('/text-me?Method=code')
    callback(null, twiml)  
	} else {
    twiml.redirect('/call-residents')
    callback(null, twiml)
  }
}
