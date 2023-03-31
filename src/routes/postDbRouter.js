"use strict";

/** 모듈 */
const express = require("express");
const router = express.Router();

/** Post */
const postDb = require("../controllers/postDbControll");
router.post("/", postDb);

module.exports = router;
