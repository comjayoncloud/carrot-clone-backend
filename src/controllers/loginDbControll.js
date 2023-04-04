"use stricts";
const mysql = require("mysql2");
const data = require("../../database.json");

/** DB config */
const pool = mysql.createPool({
  host: data.host,
  user: data.user,
  password: data.password,
  //   password: "1234",
  database: data.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/** Post - login  */
const loginDb = async (req, res) => {
  console.log("login API 서버에 요청이 들어왔어요!");

  /** req - data */
  const user_data = req.body;

  /** 1. DB를 접속하지 못하는 경우의 예외처리 (서버는 죽지않음) */
  await pool.getConnection(function (err, connection) {
    if (err) {
      res.send("db에 연결할수가 없어요");
    } else {
      try {
        connection.query(
          "SELECT * FROM UserTable",
          function (error, result, fields) {
            connection.release();

            if (error) {
              return res.send("data를 올바른 형태로 보냈는지 확인해보세요");
            } else {
              return res.send("성공");
            }
          }
        );
      } catch (error) {
        res.send(error);
      }
    }
  });
};

module.exports = loginDb;
