const expect = require('chai').expect;
const { clearDatabase, resetDatabase } = require('./helpers.js');
const { createTask, completeTask, deleteTask, listTasks } = require('./../taskCommands.js');
const taskData = require('./fixtures/tasks.json');

describe('createTask()', function () {
  it('is a function', function () {
    expect(createTask).to.be.a('function');
  });
  context('when the database is empty', function () {
    clearDatabase();
    it('should add the task "pie" to the database', function (done) {
      return createTask(task)
        .then((data) => {
          console.log('logging the returned data', data);
          expect(data.description).to.equal("pie");
      })
      .then(done, done);
    });
  });
  context('when the database is loaded with test data', function () {
    it('should add the task "cake" to the database', function (done) {

      return createTask("cake")
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
     return completeTask(1).then((task) => {
      expect(task.completed).to.be(true);
    })
    .then(done, done);
  });
});

describe('deleteTask()', function () {
  it('is a function', function () {
    expect(deleteTask).to.be.a('function');
  });
  it('should delete a given task', function (done) {
    createTask("delete me!");
    return deleteTask(1).then((tasks) => {
      expect(tasks.length).to.equal(0);
    })
    .then(done, done);
  });
});

describe('listTasks()', function () {
  it('is a function', function () {
    expect(listTasks).to.be.a('function');
  });
  it('should list all tasks', function (done) {
    resetDatabase();
    createTask("unicorns");
    return listTasks().then((tasks) => {
      expect(tasks.length).to.equal(1);
    })
    .then(done, done);
  });
});
