"use strict";

/** 모듈 */
const express = require("express");
const router = express.Router();

/** Post */
const postingDb = require("../controllers/postingDbControll");

/** jwt auth를 위한 미들웨어 */
const authMiddleware = require("../middleware/authMiddleware");
router.post("/", authMiddleware, postingDb);

module.exports = router;
