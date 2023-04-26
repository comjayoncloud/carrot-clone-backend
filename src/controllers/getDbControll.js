"use stricts";
const mysql = require("mysql2");
const data = require("../../database.json");

/** DB config */
const createPool = async () => {
  const pool = await mysql.createPool({
    host: data.host,
    user: data.user,
    password: data.password,
    database: data.database,
    waitForConnections: true,
    connectionLimit: 200,
    queueLimit: 0,
  });
  return pool;
};

const getPostData = async (promisePool) => {
  try {
    const sql_query = `SELECT * FROM PostTable `;
    const [row, fields] = await promisePool.query(sql_query);
    console.log("Data founded");
    return row;
  } catch (err) {
    console.log("DB에 연결할수가 없습니다. sqlState를 확인해주세요");

    return err;
  }
};

/** Get */
const getDb = async (req, res) => {
  console.log("get Post Data API 서버에 요청이 들어왔어요!");
  const pool = await createPool();
  const promisePool = pool.promise();
  const data = await getPostData(promisePool);
  res.send(data);
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
