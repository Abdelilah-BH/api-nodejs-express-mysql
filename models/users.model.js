
module.exports = (sequelize, {Sequelize, DataTypes}) => {
  const User = sequelize.define("user", {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
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
    }
  })

  return User;
}