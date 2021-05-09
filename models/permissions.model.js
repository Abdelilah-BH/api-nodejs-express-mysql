
module.exports = (sequelize, { DataTypes }) => {
  const Permission = sequelize.define("permissions", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    model: {
      type: DataTypes.STRING,
    },
    action: {
      type: DataTypes.STRING,
    }
  })

  Permission.associate = ({ roles }) => {
    Permission.belongsToMany(roles, { through: "role_permissions" });
  }

  return Permission;
}