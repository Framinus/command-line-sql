const expect = require('chai').expect;
const { clearDatabase, resetDatabase } = require('./helpers.js');
const { createTask, completeTask, deleteTask, listTasks } = require('./../taskCommands.js');
const db = require('./../taskCommands.js');
const taskData = require('./fixtures/tasks.json');
const pgp = require('pg-promise');


describe('createTask()', function () {
  it('is a function', function () {
    expect(createTask).to.be.a('function');
  });
  context('when the database is empty', function () {
    beforeEach(clearDatabase);
    it('should add the task "pie" to the database', function () {
      return createTask("pie").then((task) => {
        expect(task.description).to.equal("pie");
      })
      .catch((err) => { console.log(err); });
    });
  });
  context('when the database is loaded with test data', function () {
    beforeEach(resetDatabase);
    it('should add the task "cake" to the database', function () {
      return createTask("cake").then((task) => {
        expect(task.description).to.equal("cake");
      });
    });
  });
});

describe('completeTask()', function () {
  it('is a function', function () {
    expect(completeTask).to.be.a('function');
  });
  it('should change a task to completed', function () {
    return completeTask(1).then((task) => {
      expect(task.completed).to.be(true);
    });
  });
  // come up with something that would be false
});

describe('deleteTask()', function () {
  it('is a function', function () {
    expect(deleteTask).to.be.a('function');
  });
  it('should delete a given task', function () {
    createTask("delete me!");
    return deleteTask(1).then((tasks) => {
      expect(tasks.length).to.equal(0);
    });
  });
});

describe('listTasks()', function () {
  it('is a function', function () {
    expect(listTasks).to.be.a('function');
  });
  it('should list all tasks', function () {
    resetDatabase();
    createTask("unicorns");
    return listTasks().then((tasks) => {
      expect(tasks.length).to.equal(2);
    });
  });
});
