const expect = require('chai').expect;
const { clearDatabase, resetDatabase } = require('./helpers.js');
const { createTask, completeTask, deleteTask, listTasks } = require('./../taskCommands.js');
const taskData = require('./fixtures/tasks.json');

describe('createTask()', function () {
  it('is a function', function () {
    expect(createTask).to.be.a('function');
  });

  context('when the database is empty', function () {
    beforeEach(clearDatabase);
    it('should add the task "pie" to the database', function (done) {
      createTask("pie")
        .then((data) => {
          expect(data.description).to.equal("pie");
      })
      .then(done, done);
    });
  });
  context('when the database is loaded with test data', function () {
    beforeEach(resetDatabase);
    it('should add the task "cake" to the database', function (done) {
      createTask("cake")
      .then(function(task) {
        expect(task.description).to.equal("cake");
      })
      .then(done, done);
    });
  });
});

describe('completeTask()', function () {
  it('is a function', function () {
    expect(completeTask).to.be.a('function');
  });
  it('should change a task to completed', function (done) {
     completeTask(1).then((task) => {
      expect(task.completed).to.equal(true);
    })
    .then(done, done);
  });
});

describe('deleteTask()', function () {
  beforeEach(resetDatabase);
  it('is a function', function () {
    expect(deleteTask).to.be.a('function');
  });
  it('should delete a given task', function (done) {
    deleteTask(1)
    listTasks().then((tasks) => {
      expect(tasks.length).to.equal(9);
    })
    .then(done, done);
  });
});

describe('listTasks()', function () {
  beforeEach(resetDatabase);
  it('is a function', function () {
    expect(listTasks).to.be.a('function');
  });
  it('should list all tasks', function (done) {
    listTasks().then((tasks) => {
      expect(tasks.length).to.equal(10);
    })
    .then(done, done);
  });
});
