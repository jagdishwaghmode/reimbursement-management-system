const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password, company_id, role_id } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            company_id,
            role_id,
            first_name,
            last_name,
            email,
            password: hashedPassword
        };

        const result = await userModel.createUser(userData);
        res.status(201).json({ message: "User created successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await userModel.findUserByEmail(email);

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.uuid, email: user.email }, "your_secret_key", {
            expiresIn: "24h"
        });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
