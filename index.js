if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "join_us",
});
connection.connect();

app.get("/", function (req, res) {
  // Find count of users in DB
  const q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, function (err, results) {
    if (err) throw err;
    const count = results[0].count;
    res.render("home", { count });
  });
});

app.post("/register", function (req, res) {
  const person = {
    email: req.body.email,
  };
  connection.query("INSERT INTO users SET ?", person, function (err, result) {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(8080, function () {
  console.log("Server running on 8080!");
});
