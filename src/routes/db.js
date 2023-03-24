"use strict";

/** 모듈 */
const express = require("express");
const router = express.Router();

const getDb = require("../controllers/getDb");

/** Get */
router.get("/", getDb);

module.exports = router;

/** ----------------- 추후 ---------------- */
/** post */
/** insert */
/** delete */
