const { db } = require("../config/db");

exports.approveExpense = async (expenseId, userId, action, comment) => {
    const [rows] = await db.query(
        "CALL sp_advance_workflow(?, ?, ?, ?, @result); SELECT @result;",
        [expenseId, userId, action, comment]
    );
    return rows;
};