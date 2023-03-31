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

/** Get */
const getDb = (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    // Use the connection
    connection.query(
      "SELECT * FROM UserTable",
      function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
        // Do something with the results
        return res.send(results);
      }
    );
  });
};

module.exports = getDb;

/**
 * 예를들어 module.exports ={
 * hello,
 * login
 * }
 *  2가지 일 경우 . 객체는 키 :value로 되있어야하는데 따로 설정해주지않았다.
 *  이경우는 key만 넣으면 자체적으로 key와 같은 value를 넣어주게되있음.
 *  즉 hello:hello , login:login 으로 자동으로됨
 */
