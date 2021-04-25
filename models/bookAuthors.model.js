module.exports = (sequelize, { Sequelize ,DataTypes }) => {
  const BookAuthors = sequelize.define("book_authors", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
  })


  return BookAuthors;
} 