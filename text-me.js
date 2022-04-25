exports.handler = function(context, event, callback) {
	let twiml = new Twilio.twiml.VoiceResponse();

	var bodyText;

	if (event.Method == 'phrase') {
	    bodyText = 'Someone used the entry PHRASE.'
	} else if (event.Method == 'code') {
	    bodyText = 'Someone used the entry CODE.'
	}	else {
	    bodyText = 'Someone buzzed but didn\'t know the passcode.'
	}

	context.getTwilioClient().messages.create({
		to: context.NOAM_PHONE,
		from: context.TWILIO_PHONE,
		body: bodyText,
	})
		.then((message) => {
		console.log(message.sid);
		callback(null, twiml); 
	})
	.catch((err) => callback(err, null));
};
