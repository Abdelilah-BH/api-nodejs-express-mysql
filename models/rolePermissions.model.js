module.exports = (sequelize, { DataTypes }) => {
  const RolePermissions = sequelize.define("role_permissions", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
  })

  return RolePermissions;
}