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
    }
    console.log("Data founded");
    return row[0];
  } catch (err) {
    console.log("DB에 연결할수가 없습니다. sqlState를 확인해주세요");
    return err;
  }
};

const makeJwt = async (data, req_data, res) => {
  if (data.user_password == req_data.user_password) {
    const payload = {
      type: "JWT",
      username: "testuser",
      role: "user",
    };

    const secretKey = "shhhh";
    const expiresIn = "1h";

    const token = await jwt.sign(payload, secretKey, { expiresIn });
    return token;
  }
  console.log("Check req's password and db's password");
  return "wrong";
};

/** MAIN - Post - login  */
const loginDb = async (req, res) => {
  console.log("login API 서버에 요청이 들어왔어요!");
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

  if (jwt == "wrong") {
    res.sendStatus(406);
  }
  res.cookie("token", jwt, {
    /** xss공격으로부터 쿠키보호 . 클라이언트 측 js에서 쿠키에 접근할 수 없음 . 추후 추가적인 xss 공격 방지 기법 써야됌 .*/
    httpOnly: true,
    /** 쿠키 만료 시간 */
    maxAge: 3600000,
    /** CSRF 공격 막기 위함 */
    sameSite: "strict",

    /** 쿠키가 HTTPS 연결을 통해서만 전송되도록 강제하게함. 이부분은 배포할때 https 적용후 사용할것.  */
    // secure: true
  });
  res.status(200).json({
    code: 200,
    message: "로그인 성공",
  });
};

module.exports = loginDb;
