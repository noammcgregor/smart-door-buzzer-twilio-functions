/**
 *  Simple call box routine
 * 
 *  This function is meant for the apartment building callbox
 *  It gives the user a couple of seconds to produce the password
 * 	Then dials all the residents to grant manual entry
 */
exports.handler = function(context, event, callback) {

  let twiml = new Twilio.twiml.VoiceResponse();
  
  if (context.AUTO_BUZZ == 'true') {
    // Check if autobuzz is enabled
    twiml.say({voice: 'man'}, 'Welcome friend!')
    twiml.play({digits: '99999999'}) // Pressing 6 sends DTFM tone to open the door
    twiml.pause({length:1})
    twiml.redirect('/text-me?Method=auto')
  }

  // Gather both speech and digit entry from user
  twiml.say({voice: 'woman'}, 'hold')  
  twiml.gather({
    action: '/door-open',
    hints: context.PASSPHRASE,
    input: 'speech dtmf',
    numDigits: '3',
    speechTimeout: 1,
    timeout: 1,
  })

  twiml.redirect('/call-residents')
  callback(null, twiml)  
}
