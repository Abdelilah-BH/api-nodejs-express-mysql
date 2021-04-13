const router = require("express").Router();
const users = require("../controllers/users.controller");
const { authenticateToken } = require("../middlewares/user.middeleware");

router.post("/signup", users.signUp);

router.post("/login", users.login);

router.post("/", authenticateToken, users.findAll)

module.exports = (app) => {
  app.use("/api/users", router)
}