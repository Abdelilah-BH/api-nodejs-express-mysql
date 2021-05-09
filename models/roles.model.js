
module.exports = (sequelize, { DataTypes }) => {
  const Role = sequelize.define("roles", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "USER",
      unique: true,
    }
  });

  Role.associate(({ permissions }) => {
    Role.belongsToMany(permissions, { through: "rolePermissions" })
  })


  return Role;
}