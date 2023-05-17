const express = require("express");
const { createDB, getDB } = require("../controllers/db");
const router = express.Router();

router.post("/", createDB);
router.get("/", getDB);


module.exports = router;