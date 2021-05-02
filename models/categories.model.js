module.exports = (sequelize, { Sequelize, DataTypes }) => {
  const Category = sequelize.define("categories", {
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
    },
    parentId: {
      type: DataTypes.UUID,
      references: {
        model: "categories",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  });

  Category.associate = ({ books }) => {
    Category.belongsToMany(books, { through: "book_categories" });
  }


  return Category;
}