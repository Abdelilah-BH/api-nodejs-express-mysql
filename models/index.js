const Sequelize = require("sequelize");

const { HOST_DB, USER_DB, DATABASE_NAME } = process.env;
const sequelize = new Sequelize(DATABASE_NAME, USER_DB, "", { host: HOST_DB, dialect: "mysql" })
const users = require("./users.model.js")(sequelize, Sequelize);
const userDeliveryAdresses = require("./deliveryAdresses.model")(sequelize, Sequelize);
const db = { Sequelize, sequelize, users, userDeliveryAdresses };


module.exports = db;