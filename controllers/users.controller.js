const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and save a new User.
exports.signUp = (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if (!name || !email || !password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      res.status(500).send({
        message: err || "Some error occurred while creating a user.",
      });
    }
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        res.status(500).send({
          message: err || "Some error occurred while creating a user.",
        });
      }
      try {
        const data = await User.create({ name, email, password: hash, phone, role });
        res.send(data);
      } catch (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating a user.",
        });
      }
    });
  });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  //
};

// Update a user by the id in the request
exports.update = (req, res) => {};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {};
