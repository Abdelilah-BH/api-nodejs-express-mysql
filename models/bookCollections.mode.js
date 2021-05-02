module.exports = (sequelize, { DataTypes }) => {
  const BookCollections = sequelize.define("book_collections", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
  })

  return BookCollections;
}