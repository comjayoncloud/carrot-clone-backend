"use stricts";
const mysql = require("mysql2");
const data = require("../../database.json");

/** DB config */
const pool = mysql.createPool({
  host: data.host,
  user: data.user,
  password: data.password,
  database: data.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/** Post */
const postDb = (req, res) => {
  const user_data = req.body;
  console.log(user_data);
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    // Use the connection
    connection.query(
      "INSERT INTO UserTable SET ? ",
      user_data,
      function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
        // Do something with the results
        return res.send("data insert successed");
        // return res.send(user_data);
      }
    );
  });
};

module.exports = postDb;
