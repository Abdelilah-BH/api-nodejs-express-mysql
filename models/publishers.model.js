
module.exports = (sequelize, { DataTypes }) => {
  const Publisher = sequelize.define("publisher", {
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min: 3,
        max: 255,
      }
    }
  })

  Publisher.associate = ({ books }) => {
    Publisher.belongsToMany(books, { through: "book_publishers"});
  }

  return Publisher;
}