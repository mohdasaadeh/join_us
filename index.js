const mysql = require("mysql");
const { faker } = require("@faker-js/faker");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "join_us",
});

connection.connect();

const users = [];
for (let i = 0; i < 500; i++) {
  users.push([faker.internet.email(), faker.date.past()]);
}

connection.query(
  "INSERT INTO users(email, created_at) VALUES ?",
  [users],
  function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  }
);

connection.end();
