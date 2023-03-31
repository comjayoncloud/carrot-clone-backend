"use strict";

/** 모듈 */
const express = require("express");
const router = express.Router();

/** Get */
const getDb = require("../controllers/getDbControll");
router.get("/", getDb);

module.exports = router;
