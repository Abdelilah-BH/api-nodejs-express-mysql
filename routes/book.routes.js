const router = require("express").Router();
const { add } = require("../controllers/books.controller");

router.post("/add", add);

module.exports = (app) => {
  app.use("/api/books", router);
}