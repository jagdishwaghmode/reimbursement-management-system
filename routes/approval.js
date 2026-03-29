const express = require("express");
const router = express.Router();
const approvalController = require("../controllers/approvalController");

router.post("/approve", approvalController.approveExpense);

module.exports = router;
