const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password, company_id, role_id } = req.body;

    if (!first_name || !last_name || !email || !password || !company_id || !role_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: first_name, last_name, email, password, company_id, role_id"
      });
    }

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

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      data: { userId: result.insertId }
    });
  } catch (error) {
    const isDuplicate = error.code === "ER_DUP_ENTRY";
    res.status(isDuplicate ? 409 : 500).json({
      success: false,
      message: isDuplicate ? "Email is already registered" : "Unable to register user"
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: email and password"
      });
    }

    const users = await userModel.findUserByEmail(email);
    if (!users || users.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const sessionResult = await userModel.createSession(user.id || user.user_id || user.uuid);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id || user.user_id || user.uuid,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        },
        session: {
          insertId: sessionResult.insertId
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to complete login" });
  }
};
