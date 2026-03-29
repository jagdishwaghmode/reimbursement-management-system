const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root123",
    database: "reimbursement_db",
    waitForConnections: true,
    connectionLimit: 10
});

const db = pool.promise();

// Test database connection
const testConnection = async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ MySQL Database connected successfully!");
        connection.release();
        return true;
    } catch (error) {
        console.error("❌ MySQL Connection failed!");
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);
        console.error("\n📋 Troubleshooting:");
        console.error("1. Ensure MySQL server is running");
        console.error("2. Verify credentials - user: root, password: root123");
        console.error("3. Create database: CREATE DATABASE reimbursement_db;");
        console.error("4. Check MySQL is listening on localhost:3306");
        return false;
    }
};

module.exports = { db, testConnection };