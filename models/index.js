const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const { HOST_DB, USER_DB, DATABASE_NAME } = process.env;
const sequelize = new Sequelize(DATABASE_NAME, USER_DB, "", {
  host: HOST_DB,
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const db = { Sequelize, sequelize };

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    console.log({ model: model.name })
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
