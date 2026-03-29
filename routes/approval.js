const express = require("express");
const router = express.Router();
const approvalModel = require("../models/approvalModel");

// Approve or Reject Expense
router.post("/action", async (req, res) => {
    try {
        const { expenseId, userId, action, comment } = req.body;

        const result = await approvalModel.approveExpense(expenseId, userId, action, comment);
        res.json({ message: `Expense ${action}ed successfully`, data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
