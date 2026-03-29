const query = require("../config/query");

exports.createUser = async (data) => {
    const sql = `
        INSERT INTO users 
        (uuid, company_id, role_id, first_name, last_name, email, password_hash)
        VALUES (UUID(), ?, ?, ?, ?, ?, ?)
    `;
    return await query(sql, [
        data.company_id,
        data.role_id,
        data.first_name,
        data.last_name,
        data.email,
        data.password
    ]);
};

exports.findUserByEmail = async (email) => {
    return await query("SELECT * FROM users WHERE email = ?", [email]);
};