const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.users;
// const Op = db.Sequelize.Op;

// Create and save a new User.

const signUp = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    console.log("akka");
    const cryptedPassword = bcrypt.hashSync(password, 12);
    const data = await User.create({
      name,
      email,
      password: cryptedPassword,
      phone,
      role,
    });
    return res.status(200).json(data);
  } catch (err) {
    console.error({ err })
    return res.status(500).send("Some error occurred while creating a user.");
  }
};

// Login.
const login = async (req, res) => {
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
    const compare = bcrypt.compare(pswd, password());
    if (!compare) {
      return res.status(401).send("Incorrect password");
    }
    const accessToken = jwt.sign(
      {
        id,
        email,
        role
      },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      data: { id, name, email, role },
      accessToken,
    });
  } catch ({ message }) {
    console.err({ message });
    return res.status(500).send("Some error occurred while find a user.");
  }
};

// Retrieve all users from the database.
// TODO
const findAll = async (req, res) => {
  try{
    const { page, size } = req.query;
    const { limit, offset } = getPagination(size, page);
    const users = await User.findAndCountAll({
      limit,
      offset
    });
    const response = getPaginationData(users, page, limit);
    return res.status(200).send(response);  
  } catch({ message }) {
    console.err({ message });
    return res.status(500).send("Error server");
  }
};

const findOne = async (req, res) => {
  try{
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if(!user) {
      return res.status(401).send("User not found");
    }
    return res.status(200).send(user);
  } catch({ message }) {
    console.error(message);
  }

}

// Update a user by the id in the request
// TODO
// const update = (req, res) => {};

// Delete a user with the specified id in the request
// TODO
// const delete = (req, res) => {};

module.exports = {
  signUp,
  login,
  findAll,
  findOne
}