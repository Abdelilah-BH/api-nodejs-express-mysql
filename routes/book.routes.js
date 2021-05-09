const router = require("express").Router();
const { add, findAll, findOne, destroy } = require("../controllers/books.controller");
const { authenticateToken } = require("../middlewares/user.middeleware");

router.get("/", authenticateToken, findAll);

router.get("/:id", authenticateToken, findOne);

router.post("/add", authenticateToken, add);

router.delete("/:id", authenticateToken, destroy);

module.exports = (app) => {
  app.use("/api/books", router);
}