module.exports = (sequelize, { Sequelize, DataTypes }) => {
  const Contact = sequelize.define("contact", {
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
    phone: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min: 3
      }
    },
    userId: {
      type: DataTypes.UUID,
      field: "userId",
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  })

  Contact.associate = (models) => {
    console.log({ models });
    Contact.belongsTo(models.user, { foreignKey: "userId", as: "user", onDelete: 'CASCADE' })
  }

  return Contact;
}