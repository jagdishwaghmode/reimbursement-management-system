const express = require("express");
const router = express.Router();
const expenseModel = require("../models/expenseModel");

// Create Expense
router.post("/create", async (req, res) => {
    try {
        const expenseData = {
            company_id: req.body.company_id,
            user_id: req.body.user_id,
            category_id: req.body.category_id,
            amount: req.body.amount,
            currency_id: req.body.currency_id,
            base_amount: req.body.base_amount,
            base_currency_id: req.body.base_currency_id,
            exchange_rate: req.body.exchange_rate,
            title: req.body.title,
            date: req.body.date
        };

        const result = await expenseModel.createExpense(expenseData);
        res.status(201).json({ message: "Expense created successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
