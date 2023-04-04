"use strict";

/** 모듈 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/** 포트 */
const port = 3030;

/** Cors 설정 */
const cors = require("cors");
app.use(cors());

/** db 라우팅 */
const getDbRouter = require("./src/routes/getDbRouter");
const signupDbRouter = require("./src/routes/signupDbRouter");
const loginDbRouter = require("./src/routes/loginDbRouter");
/** body-parser 미들웨어에 등록 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** 미들웨어에 get,post 라우터 등록 */
app.use("/get", getDbRouter);
app.use("/signup", signupDbRouter);
app.use("/login", loginDbRouter);

/** 서버 시작 */
app.listen(port, () => {
  console.log(`서버 가동.http://localhost:${port}`);
});
