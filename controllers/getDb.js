"use stricts";
/** 연결하는곳 db route는 그냥 path만. */

const getDb = (req, res) => {
  res.send("getDb");
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
