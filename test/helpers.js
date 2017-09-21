const { db, sql } = require('./../taskCommands.js');
const tasksFixtures = require('./fixtures/tasks.json');

const clearDatabase = function () {
  return sql.db.oneOrNone("DELETE * FROM tasks")
  .catch((err) => {
    console.log(err.message + "problem clearing database");
  });
};

const resetTaskIDs = function () {
  return sql.db.any('ALTER SEQUENCE "tasks_id_seq" RESTART WITH 1;')
  .catch((err) => {
    console.log(err.message + "problem resetting id sequence.");
  });
};

const insertTasksFixtures () {
  return Promise.all(
    taskFixtures.map((task) => sql.createTask(task));
  )
  .catch((err) => {
    console.log(err.message + "problem inserting tasks from tasks.json");
  });
};

const resetDatabase = function () {
  return clearDataBase()
  .then(resetTaskIDs)
  .then(insertTasksFixtures)
  .catch((err) => {
    console.log(err.message + "problem resetting database");
  });
};

module.exports = {
  clearDatabase,
  resetDatabase
}
