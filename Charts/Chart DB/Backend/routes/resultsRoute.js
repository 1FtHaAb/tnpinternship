const express = require("express");
const router = express.Router();

const { getResults } = require("../controllers/resultsController");

router.post("/", getResults);

module.exports = router;