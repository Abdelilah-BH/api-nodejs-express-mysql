module.exports = (sequelize, { Sequelize ,DataTypes }) => {
  const BookAuthors = sequelize.define("book_authors", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    bookId: {
      type: DataTypes.UUID,
      references: {
        model: "book",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    authorId: {
      type: DataTypes.UUID,
      references: { 
        model: "author",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  })

  return BookAuthors;
} 