var expect = require('expect.js');
var moment = require('moment');
var getAssignedChores = require('../src/getAssignedChores');

var startDate = moment().toDate();
var chores = [
    {
      description: 'Take out trash',
      interval: 'DAILY'
    },
    {
      description: 'Wipe down counters',
      interval: 'DAILY'
    },
    {
      description: 'Mop Upstairs',
      interval: 'WEEKLY'
    },
    {
      description: 'Clean Bathroom',
      interval: 'WEEKLY'
    }
  ];
  var people = [
    {
      name: 'Greg',
      phoneNumber: '5555555555'
    },
    {
      name: 'Ryan',
      phoneNumber: '5555555555'
    }
  ];

describe('getAssignedChores()', function() {
  it('get first day assigned chores', function() {  
    var currentDate = moment('2016-12-11').toDate();

    var choreAssignments = getAssignedChores(startDate, currentDate, chores, people);

    expect(choreAssignments).to.be.an('array');
    expect(choreAssignments).to.eql([
      {
        person: people[0],
        chore: chores[0]
      },
      {
        person: people[1],
        chore: chores[1]
      },
      {
        person: people[0],
        chore: chores[2]
      },
      {
        person: people[1],
        chore: chores[3]
      }
    ]);
  });

  it('get second day assigned chores', function() {  
    var currentDate = moment('2016-12-11').add(1, 'days').toDate();

    var choreAssignments = getAssignedChores(startDate, currentDate, chores, people);

    expect(choreAssignments).to.be.an('array');
    expect(choreAssignments).to.eql([
      {
        person: people[0],
        chore: chores[1]
      }, {
        person: people[1],
        chore: chores[0]
      },
      {
        person: people[0],
        chore: chores[3]
      },
      {
        person: people[1],
        chore: chores[2]
      }
    ]);
  });
});
