const router = require("express").Router();
const { add, findAll } = require("../controllers/books.controller");
const { authenticateToken } = require("../middlewares/user.middeleware");

router.get("/", authenticateToken, findAll);
router.post("/add", authenticateToken, add);

module.exports = (app) => {
  app.use("/api/books", router);
}