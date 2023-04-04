"use strict";

/** 모듈 */
const express = require("express");
const router = express.Router();

/** Post */
const loginDb = require("../controllers/loginDbControll");
router.post("/", loginDb);

module.exports = router;
