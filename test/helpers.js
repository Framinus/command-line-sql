const sql = require('./../taskCommands.js');
const pgp = require('pg-promise');
const createTask = require('./../taskCommands.js');
const taskData = require('./fixtures/tasks.json');

const clearDatabase = function () {
  return sql.db.any(`DELETE FROM tasks`)
  .then(resetTaskIDs)
  .catch((err) => {
    console.log("problem clearing database " + err.message);
  });
};

const resetTaskIDs = function () {
  return sql.db.any('ALTER SEQUENCE "tasks_id_seq" RESTART WITH 1;')
  .catch((err) => {
    console.log(err.message + "problem resetting id sequence.");
  });
};

const insertTaskData = function () {
  return Promise.all(
    taskData.map((task) => {
      createTask(task);
    })
  )
  .catch((err) => {
    console.log(err.message + "problem inserting tasks from tasks.json");
  });
};

const resetDatabase = function () {
  return clearDatabase()
  .then(resetTaskIDs)
  .then(insertTaskData)
  .catch((err) => {
    console.log(err.message + "problem resetting database");
  });
};

module.exports = {
  clearDatabase,
  insertTaskData,
  resetDatabase,
  resetTaskIDs
}
