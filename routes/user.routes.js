const router = require("express").Router();
const users = require("../controllers/users.controller")

router.post("/", users.signUp);

module.exports = (app) => {
  app.use("/api/users", router)
}