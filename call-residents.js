exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  
  // If no valid answer after timeout, dial all residents until someone picks up
  var path = '/text-me?Method=call'
  let dial = twiml.dial({action: path});
  dial.number(context.NOAM_PHONE);
  dial.number(context.MANDA_PHONE);
  
  callback(null, twiml)  
}
