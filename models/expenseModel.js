const query = require("../config/query");

exports.createExpense = async (data) => {
    const sql = `
        INSERT INTO expenses
        (uuid, company_id, submitted_by, category_id, amount, currency_id,
         base_amount, base_currency_id, exchange_rate, exchange_rate_date,
         title, expense_date, status)
        VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), ?, ?, 'submitted')
    `;
    
    return await query(sql, [
        data.company_id,
        data.user_id,
        data.category_id,
        data.amount,
        data.currency_id,
        data.base_amount,
        data.base_currency_id,
        data.exchange_rate,
        data.title,
        data.date
    ]);
};