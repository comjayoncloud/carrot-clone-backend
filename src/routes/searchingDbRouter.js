"use strict";

/** 모듈 */
const express = require("express");
const router = express.Router();
/** Post */
const searchingDb = require("../controllers/searchingDbControll");
router.get("/", searchingDb);

module.exports = router;
