const Sequelize = require("sequelize");

const { HOST_DB, USER_DB, DATABASE_NAME } = process.env;
const sequelize = new Sequelize(DATABASE_NAME, USER_DB, "", { host: HOST_DB, dialect: "mysql" })

;(async () => {
 try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch(error) {
    console.error('Unable to connect to the database:', error);
  }  
})()

const users = require("./users.model.js")(sequelize, Sequelize);
const userDeliveryAdresses = require("./deliveryAdresses.model")(sequelize, Sequelize);
const db = { Sequelize, sequelize, users, userDeliveryAdresses };


module.exports = db;