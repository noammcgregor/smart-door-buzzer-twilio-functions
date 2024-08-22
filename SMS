exports.handler = function(context, event, callback) {
	let twiml = new Twilio.twiml.VoiceResponse();

	var bodyText;

	if (event.Method == 'phrase') {
	    bodyText = 'Access granted using entry PHRASE.'
	} else if (event.Method == 'code') {
	    bodyText = 'Access granted using entry CODE.'
	} else if (event.Method == 'auto') {
	    bodyText = 'Access granted.'
	} else {
	    bodyText = 'Call forwarded.'
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
