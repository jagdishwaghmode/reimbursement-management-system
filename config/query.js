const { db } = require("./db");

async function query(sql, params) {
    const [rows] = await db.execute(sql, params);
    return rows;
}

module.exports = query;