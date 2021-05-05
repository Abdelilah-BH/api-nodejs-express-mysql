const router = require("express").Router();
const { add, findAll, findOne } = require("../controllers/authors.controller");
const { authenticateToken } = require("../middlewares/user.middeleware");

router.get("/", authenticateToken, findAll);
router.post("/add", authenticateToken, add);
router.get("/:id", authenticateToken, findOne);

module.exports = (app) => {
  app.use("/api/authors", router);
}