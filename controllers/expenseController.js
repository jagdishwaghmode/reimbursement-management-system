const expenseModel = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  try {
    const {
      company_id,
      user_id,
      category_id,
      amount,
      currency_id,
      base_amount,
      base_currency_id,
      exchange_rate,
      title,
      date
    } = req.body;

    if (!company_id || !category_id || !amount || !currency_id || !title || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: company_id, category_id, amount, currency_id, title, date"
      });
    }

    const expenseData = {
      company_id,
      user_id: user_id || 1,
      category_id,
      amount,
      currency_id,
      base_amount: base_amount || amount,
      base_currency_id: base_currency_id || currency_id,
      exchange_rate: exchange_rate || 1,
      title,
      date
    };

    const result = await expenseModel.createExpense(expenseData);

    res.status(201).json({
      success: true,
      message: "Expense added",
      data: { expenseId: result.insertId }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to add expense" });
  }
};

exports.getMyExpenses = async (req, res) => {
  try {
    const userId = req.query.user_id || 1;
    const expenses = await expenseModel.getExpensesByUser(userId);

    res.status(200).json({
      success: true,
      message: "Expenses retrieved successfully",
      data: expenses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to retrieve expenses" });
  }
};
