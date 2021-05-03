const express = require("express");
const config = require("config");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/index");
const morgan = require("morgan");
const helmet = require("helmet");
const userRouters = require("./routes/user.routes");
const bookRouters = require("./routes/book.routes");

const { PORT } = process.env;

const corsOptions = {
  origin: "http://localhost:3000/"
}

const app = express();

app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
if (app.get("env") === "developement")
  app.use(morgan('tiny'))

db.sequelize
  .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
  .then(function() {
    db.sequelize.sync({ force: true }).then(function(err) {
      console.log('It worked!');
    }, function (err) {
      console.error('An error occurred while creating the table:', err);
    });
  })

userRouters(app);
bookRouters(app);


app.listen(PORT, () => {
  console.log(`${config.get("name")} - running on port 5000`);
});
