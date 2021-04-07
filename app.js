const express = require("express");
const config = require("config");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./models/index");
const morgan = require("morgan");
const helmet = require("helmet");
const userRouter = require("./routes/user.routes");

const { PORT } = process.env;

const corsOptions = {
  origin: "http://localhost:3000/"
}

const app = express();

app.use(cors(corsOptions));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
if (app.get("env") === "developement")
  app.use(morgan('tiny'))

db.sequelize.sync().then(() => {
  console.log("Mysql running");
})

userRouter(app);


app.listen(PORT, () => {
  console.log(`${config.get("name")} - running on port 5000`);
});
