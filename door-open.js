exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();
    
    // Get rid of random non-alphabetical chars and put to lower case
    if (event.SpeechResult !== undefined) {
        var cleanString = event.SpeechResult.replace(/[^\w\s]|_/g, "")
            .replace(/\s+/g, " ");
        var cleanSpeechResult = cleanString.toLowerCase(); 
        
        context.getTwilioClient().messages.create({
    		to: context.NOAM_PHONE,
    		from: context.TWILIO_PHONE,
    		body: 'Speech: \n'+cleanSpeechResult + '\nConfidence '+event.Confidence,
    	})
    } else {
        var cleanSpeechResult = " ";
    }
  
    console.log('Speech: ' + cleanSpeechResult + '; confidence: ' + event.Confidence)
    console.log('Digits: ' + event.Digits)
    
    if (cleanSpeechResult == context.PASSPHRASE) {
        // Check if we have a passphrase match, and open the door
        twiml.say({voice: 'man'}, 'Welcome friend!')
        twiml.play({digits: '99999999'}) // Pressing 9 sends DTFM tone to open the door
        twiml.pause({length:1})
        
        // Also send me a text on this 
        twiml.redirect('/text-me?Method=phrase')
        callback(null, twiml)  
    } else if (event.Digits == context.PASSCODE){
        // Check if we have a passcode match, and open the door
        twiml.say({voice: 'man'}, 'Welcome friend!')
        twiml.play({digits: '99999999'}) // Pressing 9 sends DTFM tone to open the door
        twiml.pause({length:1})
        
        // Also send me a text on this 
        twiml.redirect('/text-me?Method=code')
        callback(null, twiml)
    } else {
        twiml.redirect('/call-residents')
        callback(null, twiml)
    }
}
