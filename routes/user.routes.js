const router = require("express").Router();
const { signUp, login, findAll, findOne, destroy} = require("../controllers/users.controller");
const { authenticateToken } = require("../middlewares/user.middeleware");

router.post("/signup", signUp);

router.post("/login", login);

router.get("/", authenticateToken, findAll);

router.get("/:id", authenticateToken, findOne);

router.delete("/:id", authenticateToken, destroy);

module.exports = (app) => {
  app.use("/api/users", router);
}