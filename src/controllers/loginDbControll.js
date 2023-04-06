"use stricts";
const mysql = require("mysql2");
const data = require("../../database.json");

/** create pool */
const createPool = async () => {
  const pool = await mysql.createPool({
    host: data.host,
    user: data.user,
    password: data.password,
    database: data.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return pool;
};

const getUserData = async (promisePool) => {
  try {
    const result = await promisePool.query("SELECT * FROM UserTable");
    return result[0];
  } catch (err) {
    return err;
  }
};

/** MAIN - Post - login  */
const loginDb = async (req, res) => {
  console.log("login API 서버에 요청이 들어왔어요!");

  /** req - data */
  const user_data = req.body; // json

  /* get User data */
  // 1. pool 생성 및 promise 객체로 변경.
  const pool = await createPool();
  const promisePool = await pool.promise();

  // 2. pool로 연결후 data 받기
  const data = await getUserData(promisePool);
  console.log(data);
  res.send("뭐가문제야?");
};

module.exports = loginDb;

// const pool = mysql.createPool({
//   host: data.host,
//   user: data.user,
//   password: data.password,
//   database: data.database,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

/** 1. DB를 접속하지 못하는 경우의 예외처리 (서버는 죽지않음) */
// const getDb = await pool.getConnection(function (err, connection) {
//   if (err) {
//     res.send("db에 연결할수가 없어요");
//   } else {
//     try {
//       connection.query(
//         "SELECT * FROM UserTable",
//         function (error, result, fields) {
//           connection.release();

//           if (error) {
//             return res.send(error);
//           } else {
//             return res.send("성공");
//           }
//         }
//       );
//     } catch (error) {
//       res.send(error);
//     }
//   }
// });
