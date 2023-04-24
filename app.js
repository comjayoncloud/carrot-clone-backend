"use strict";

/** 모듈 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/** 포트 */
const port = 3030;

/** Cors 설정 */
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

/** db 라우팅 */
const getDbRouter = require("./src/routes/getDbRouter");
const signupDbRouter = require("./src/routes/signupDbRouter");
const loginDbRouter = require("./src/routes/loginDbRouter");
const postingDbRouter = require("./src/routes/postingDbRouter");
/** body-parser 미들웨어에 등록 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** 미들웨어에 get,post 라우터 등록 */
app.use("/getpostdb", getDbRouter);
app.use("/signup", signupDbRouter);
app.use("/login", loginDbRouter);
app.use("/posting", postingDbRouter);

/** 서버 시작 */
app.listen(port, () => {
  console.log(`서버 가동.http://localhost:${port}`);
});
