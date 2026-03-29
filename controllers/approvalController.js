const approvalModel = require("../models/approvalModel");

exports.approveExpense = async (req, res) => {
  try {
    const { expenseId, userId, action, comment } = req.body;

    if (!expenseId || !userId || !action) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: expenseId, userId, action"
      });
    }

    const normalizedAction = action.toLowerCase();
    if (!["approved", "rejected"].includes(normalizedAction)) {
      return res.status(400).json({
        success: false,
        message: "Action must be either 'approved' or 'rejected'"
      });
    }

    const result = await approvalModel.approveExpense(expenseId, userId, normalizedAction, comment || "");

    res.status(200).json({
      success: true,
      message: `Expense ${normalizedAction} successfully`,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to process approval" });
  }
};
