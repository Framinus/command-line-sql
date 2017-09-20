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
      console.log(`Task added: ${data.description}`);
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
    console.log(`Completed task ${data.id}: ${data.description}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

function deleteTask(id) {
  return db.one(`
    DELETE FROM tasks
    WHERE id = $1
    RETURNING *
    `, id)
    .then((data) => {
      console.log(`Deleted task # ${data.id}: ${data.description}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function listTasks() {
  return db.any("SELECT * FROM tasks;")
  .then((data) => {
    console.log(`Id  Description   Status`);
    console.log(`---------------------------------`);
    const sortedArray = data.sort((a, b) => {
      const idA = a.id;
      const idB = b.id;
      return idA - idB;
    });
    // function spacer () {
    //   function determineSpace() {
    //     for (let i = 0; i < sortedArray.length; i += 1) {
    //       let maxLength = 0;
    //       if (sortedArray[i].description.length > maxLength) {
    //         maxLength = sortedArray[i].description.length;
    //       }
    //     }
    //     return maxLength + 2;
    //   }
    //   const space = ' '.repeat(determineSpace);
    //   return space;
    //   }
    sortedArray.forEach((row) => {
      console.log(`${row.id}  ${row.description} ${row.completed}`);
    });
  })
  .catch((err) => {
    console.log(err);
  })
  pgp.end();
}

module.exports = {
  createTask, completeTask, deleteTask, listTasks
}
