module.exports = (sequelize, { DataTypes }) => {
  const BookCategories = sequelize.define("book_categories", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
  })

  return BookCategories;
}