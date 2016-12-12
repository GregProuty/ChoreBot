var moment = require('moment');

var MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

function getAssignedChores(startDate, currentDate, chores, people) {
  var beginningOfStartDate = new Date(startDate).setHours(0,0,0,0);
  var beginningOfCurDate = new Date(currentDate).setHours(0,0,0,0);
  var daysSinceStart = Math.floor(( beginningOfCurDate - beginningOfStartDate ) / MILLISECONDS_IN_DAY );
  
  var startOfWeek = moment(startDate).startOf('isoweek');
  var weeksSinceStart = moment(currentDate).diff(startOfWeek, 'week');

  var choreAssignments = people.reduce((acc, person) => {
    acc[person.userKey] = {
     person,
     chores: []
    };
    return acc;
  }, {});

  var dailyChores = chores.filter((chore) => chore.interval === 'DAILY');
  var weeklyChores = chores.filter((chore) => chore.interval === 'WEEKLY');
  
  for(var i = 0; i < dailyChores.length; i++){
    choreAssignments[people[i].userKey].chores.push(
      dailyChores[(i + daysSinceStart) % dailyChores.length]
    );
  }

  for(var i = 0; i < weeklyChores.length; i++){
    choreAssignments[people[i].userKey].chores.push(
      weeklyChores[(i + weeksSinceStart) % weeklyChores.length]
    );
  }

  return choreAssignments;
}

module.exports = getAssignedChores;