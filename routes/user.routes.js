const router = require("express").Router();
const { signUp, login, findAll, findOne } = require("../controllers/users.controller");
const { authenticateToken } = require("../middlewares/user.middeleware");

router.post("/signup", signUp);

router.post("/login", login);

router.get("/", authenticateToken, findAll);

router.get("/:id", authenticateToken, findOne);

module.exports = (app) => {
  app.use("/api/users", router);
}