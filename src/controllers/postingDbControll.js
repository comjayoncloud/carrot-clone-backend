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
    connectionLimit: 10,
    queueLimit: 0,
  });
  return pool;
};

const postDataToDb = async (promisePool, req_data) => {
  try {
    console.log(req_data);
    const sql_query = `INSERT INTO PostTable (post_subject,post_content,post_img,post_price) VALUES('${req_data.subject}','${req_data.content}','${req_data.fileUrl}','${req_data.price}')`;
    const [row, fields] = await promisePool.query(sql_query);
  } catch (err) {
    console.log(err);
    return err;
  }
};
/** Post - signup  */

const postingDb = async (req, res) => {
  console.log("auth통과!");
  console.log("postingDb 에 요청이 왔어요");
  const req_data = req.body;

  const pool = await createPool();
  const promisePool = pool.promise();

  const post = await postDataToDb(promisePool, req_data);
  res.send("글쓰기 성공!");
};

module.exports = postingDb;
