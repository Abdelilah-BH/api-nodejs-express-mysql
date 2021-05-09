const router = require("express").Router();
const { add, findAll, findOne, destroy } = require("../controllers/categories.controller");
const { authenticateToken } = require("../middlewares/user.middeleware");

router.get("/", authenticateToken, findAll);

router.post("/add", authenticateToken, add);

router.get("/:id", authenticateToken, findOne);

router.delete("/:id", authenticateToken, destroy);

module.exports = (app) => {
  app.use("/api/categories", router);
}