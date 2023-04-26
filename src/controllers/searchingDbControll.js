"use stricts";
const mysql = require("mysql2");
const data = require("../../database.json");

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
const getSearchData = async (promisePool, searchKeyword) => {
  try {
    const sql_query = `SELECT * FROM PostTable WHERE post_subject LIKE '%${searchKeyword}%'`;
    const [row, fields] = await promisePool.query(sql_query);
    if (row.length === 0) {
      return "데이터가 없습니다";
    }
    console.log("data founded");
    return row;
  } catch (err) {
    console.log("Data가 없습니다. err code를 확인해주세요");
    return err;
  }
};

const searchingDb = async (req, res) => {
  console.log("searchingDb 에 요청이 왔어요");
  const pool = await createPool();
  const promisePool = pool.promise();
  const searchKeyword = req.query.keyword;
  const data = await getSearchData(promisePool, searchKeyword);
  res.send(data);
};

module.exports = searchingDb;
