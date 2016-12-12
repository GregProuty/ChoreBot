var fs = require('fs');
var path = require('path');
var schedule = require('node-schedule');
var getAssignedChores = require('./getAssignedChores');
var sendChoreMessage = require('./sendChoreMessage');

var startDate = new Date();

var config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json'), 'utf8'));

function sendAllMessages() {
  var curDate = new Date();
  
  var assignedChores = getAssignedChores(startDate, curDate, config.chores, config.people);

  Object.keys(assignedChores).forEach((userKey) => {
    sendChoreMessage(config.apiKey, assignedChores[userKey]);
  });
}

schedule.scheduleJob(config.notificationTime, () => {
  sendAllMessages();
});