// const db = require("./index");

module.exports = (sequelize, {DataTypes}) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-f]{64}$/i
    },
    phone: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("root", "admin", "ghost"),
      allowNull: false,
      defaultValue: "ghost"
    },
  })

  return User;
}