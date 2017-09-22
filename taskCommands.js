const pgp = require('pg-promise')();

const databaseName = process.env.NODE_ENV === 'test'
                      ? 'tasks_test'
                      : 'tasks';

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: databaseName,
});

const createTask = function (arg) {
  return db.one(`
    INSERT INTO tasks (description, completed)
    VALUES ($1, $2)
    RETURNING *;
    `, [arg, false])
    .then((data) => {
      console.log(`Task added: ${data.description}`);
    })
    .then(data => data)
    .catch((err) => {
      console.log(err, `input must be in this order: add, then a task.`);
    });
}

const completeTask = function (id) {
  return db.one(`
    UPDATE tasks
    SET completed = true
    WHERE id = $1
    RETURNING *
    `, [id])
  .then((data) => {
    console.log(`Completed task ${data.id}: ${data.description}`);
  })
  .catch((err) => {
    console.log(`input must be in this order: complete, then task # you want to complete..`);
  });
}

const deleteTask = function (id) {
  return db.one(`
    DELETE FROM tasks
    WHERE id = $1
    RETURNING *
    `, id)
    .then((data) => {
      console.log(`Deleted task # ${data.id}: ${data.description}`);
    })
    .catch((err) => {
      console.log(`input must be in this order: delete, then the task number you want to delete.`);
    });
}

const listTasks = function () {
  return db.any("SELECT * FROM tasks;")
  .then((data) => {
    console.log(`\nId  Description   Completed`);
    console.log(`---------------------------`);
    const sortedArray = data.sort((a, b) => {
      const idA = a.id;
      const idB = b.id;
      return idA - idB;
    });
      const spacer = function () {
        let maxLength = 0;
        for (let i = 0; i < sortedArray.length; i += 1) {
          if (sortedArray[i].description.length > maxLength) {
            maxLength = sortedArray[i].description.length;
          }
        }
        return maxLength + 2;
      }
    sortedArray.forEach((row) => {
      const space = ' '.repeat(spacer() - row.description.length);
      console.log(`${row.id}  ${row.description} ${space} ${row.completed}`)
    });
    console.log(`---------------------------`);
    console.log(`You have ${sortedArray.length} tasks.\n`);
  })
  .catch((err) => {
    console.log(err);
  });
}

module.exports = {
  db,
  createTask,
  completeTask,
  deleteTask,
  listTasks,
  pgp
}
