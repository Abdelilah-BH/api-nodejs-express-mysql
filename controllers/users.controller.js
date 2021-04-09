const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and save a new User.
exports.signUp = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  try {
    const data = await User.create({
      name,
      email,
      password,
      phone,
      role,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating a user.",
    });
  }
};

// Login.
exports.login = async (req, res) => {
  const { email: emailUser, password: pswd } = req.body;
  if (!emailUser || !pswd) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  try {
    const user = await User.findOne({
      where: { email: emailUser },
    });
    if (!user) {
      return res.status(401).json({
        message: "E-mail not found",
      });
    }
    const { id, name, email, password, role } = user;
    const checkPassword = await bcrypt.compare(pswd, password);
    if (!checkPassword) {
      return res.status(403).json({
        message: "Password incorrect!",
      });
    }
    const token = jwt.sign(
      {
        id,
        email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { expiresIn: new Date() + 3600000 });
    return res.status(200).json({
      message: "Authentication successful!",
      data: { id, name, email, role },
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while find a user.",
    });
  }
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  //
};

// Update a user by the id in the request
exports.update = (req, res) => {};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {};
