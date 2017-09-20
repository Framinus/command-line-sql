const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'tasks',
});

function createTask(arg) {
  return db.one(`
    INSERT INTO tasks (description, completed)
    VALUES ($1, $2)
    RETURNING *;
    `, [arg, false])
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("oops!"+err.message);
    });
}

function completeTask(id) {
  return db.one(`
    UPDATE tasks
    SET completed = true
    WHERE id = $1
    RETURNING *
    `, [id])
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
}

function deleteTask(id) {
  return db.one(`
    DELETE FROM tasks
    WHERE id = $1
    RETURNING id;
    `, id)
    .then((data) => {
      console.log('You have deleted task #:');
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function listTasks() {
  return db.any("SELECT * FROM tasks;")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
}

module.exports = {
  createTask, completeTask, deleteTask, listTasks
}
