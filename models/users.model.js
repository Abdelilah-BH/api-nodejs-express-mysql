const { setSaltAndPassword } = require("../helpers/user");

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
      is: /^[0-9a-f]{64}$/i,
      get() {
        return () => this.getDataValue("password");
      }
    },
    salt: {
      type: DataTypes.STRING(),
      get() {
        return () => this.getDataValue("salt");
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

  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  return User;
}