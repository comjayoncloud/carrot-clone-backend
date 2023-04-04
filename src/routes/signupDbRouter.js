"use strict";

/** 모듈 */
const express = require("express");
const router = express.Router();

/** Post */
const signupDb = require("../controllers/signupDbControll");
router.post("/", signupDb);

module.exports = router;
