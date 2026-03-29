const express = require("express");
const app = express();
const path = require("path");

// DB
const { db, testConnection } = require("./config/db");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// View Engine
app.set("view engine", "ejs");

// Routes
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");
const approvalRoutes = require("./routes/approval");

app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/approval", approvalRoutes);

// Home
app.get("/", (req, res) => {
    res.send("Server running 🚀");
});

// Start Server
app.listen(3000, async () => {
    console.log("Server running on port 3000");
    console.log("🌐 Open your browser: http://localhost:3000");
    
    // Test database connection
    await testConnection();
});