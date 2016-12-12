var Pushover = require('pushover-notifications');

function sendChoreMessage(token, assignedChores) {
  var push = new Pushover( {
    user: assignedChores.person.userKey,
    token
  });

  var message = assignedChores.chores.map((chore) => {
    if(chore.interval === 'DAILY') {
      return 'Today: ' + chore.description;
    }

    return 'This week: ' + chore.description;
  }).join('\n');

  var msg = {
    title: "Today's Chores:",
    message: message
  };

  push.send(msg, function(err, result) {
    if (err) {
      console.error('Error sending message:', err);
      return;
    }

    console.log('Sent push notification to:', assignedChores.person.name);
  });
}

module.exports = sendChoreMessage;


