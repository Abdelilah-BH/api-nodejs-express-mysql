const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and save a new User.
exports.signUp = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Content can not be empty!");
    }
    const cryptedPassword = bcrypt.hashSync(password, 12);
    const data = await User.create({
      name,
      email,
      password: cryptedPassword,
      phone,
      role,
    });
    res.json(data);
  } catch (err) {
    res.status(500).send("Some error occurred while creating a user.");
  }
};

// Login.
exports.login = async (req, res) => {
  try {
    const { email: emailUser, password: pswd } = req.body;
    if (!emailUser || !pswd) {
      return res.status(400).send("Content can not be empty!");
    }
    const user = await User.findOne({
      where: { email: emailUser },
    });
    if (!user) {
      return res.status(401).send("E-mail not found");
    }
    const { id, name, email, password, role } = user;
    const compare = bcrypt.compareSync(pswd, password);
    if (!compare) {
      return res.status(401).send("Incorrect password");
    }
    const token = jwt.sign(
      {
        id,
        email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      data: { id, name, email, role },
      token,
    });
  } catch (err) {
    res.status(500).send("Some error occurred while find a user.");
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
