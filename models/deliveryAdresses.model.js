module.exports = (sequelize, { Sequelize, DataTypes}) => {
  const DeliveryAdresses = sequelize.define("DeliveryAdresses", {
    id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  recipient_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  adress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: "users",
      key: "id",
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
  })

  return DeliveryAdresses;
} 