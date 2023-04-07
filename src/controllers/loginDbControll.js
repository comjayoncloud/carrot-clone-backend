"use stricts";
const mysql = require("mysql2");
const data = require("../../database.json");

const jwt = require("jsonwebtoken");

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

const getUserData = async (promisePool, user_id) => {
  try {
    const sql_query = `SELECT * FROM UserTable WHERE user_id='${user_id}'`;
    const [row, fields] = await promisePool.query(sql_query);
    if (row.length == 0) {
      return "Data is not exist";
    } else {
      console.log("Data founded");
      return row[0];
    }
  } catch (err) {
    console.log("DB에 연결할수가 없습니다. sqlState를 확인해주세요");
    return err;
  }
};

const makeJwt = async (data, req_data) => {
  if (data.user_password == req_data.user_password) {
    const payload = {
      id: 1,
      username: "testuser",
      role: "admin",
    };

    const secretKey = "your_secret_key";
    const expiresIn = "1h";

    const token = await jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } else {
    console.log("Check req's password and db's password");
    return "jwt를 생성할수가 없습니다";
  }
};

/** MAIN - Post - login  */
const loginDb = async (req, res) => {
  console.log("login API 서버에 요청이 들어왔어요!");
  console.log(req);
  /** req - data */
  const req_data = req.body; // json

  /* get User data */
  // 1. pool 생성 및 promise 객체로 변경.
  const pool = await createPool();
  const promisePool = pool.promise();

  // 2. promisepool로 연결후 user_id를 기반으로 query 날린 후 data 받기
  const data = await getUserData(promisePool, req_data.user_id);

  // 3. jwt 생성
  const jwt = await makeJwt(data, req_data);
  console.log(jwt);

  res.send(jwt);
};

module.exports = loginDb;
