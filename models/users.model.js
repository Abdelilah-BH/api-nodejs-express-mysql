const { setPassword } = require("../helpers/user");

module.exports = (sequelize, { DataTypes }) => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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
      is: /^[0-9a-f]{64}$/i,
      get() {
        return () => this.getDataValue("password");
      }
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

  User.associate = ({ contacts }) => {
    User.hasMany(contacts);
  }

  User.beforeCreate(setPassword);
  User.beforeUpdate(setPassword);


  return User;
}