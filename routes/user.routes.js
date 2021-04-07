const router = require("express").Router();
const users = require("../controllers/users.controller")

router.post("/signup", users.signUp);

router.post("/login", users.login);

module.exports = (app) => {
  app.use("/api/users", router)
}