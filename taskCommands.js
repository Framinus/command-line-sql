const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'tasks',
});

function createTask(arg) {
  console.log(arg);
  return db.query(`
    INSERT INTO tasks (description, completed)
    VALUES ($1, $2)
    RETURNING *;
    `, [arg, false])
    .then((data) => {
      console.log(data[0]);
    })
    .catch((err) => {
      console.log("oops!"+err.message);
    });
}

function completeTask(id) {
  return db.query(`
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
  return db.query(`
    DELETE FROM tasks
    WHERE id = $1
    RETURNING id;
    `, id)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function listTasks() {
  return db.query("SELECT * FROM tasks;")
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
