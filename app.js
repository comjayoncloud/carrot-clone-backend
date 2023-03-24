"use strict";

/** 모듈 */
const express = require("express");
const app = express();
const port = 3000;

/** db 라우팅 */
const dbRouter = require("./routes/db");

/** 미들웨어 등록해주는 메서드*/
app.use("/", dbRouter);

/** 서버 시작 */
app.listen(port, () => {
  console.log(`서버 가동.http://localhost:${port}`);
});
