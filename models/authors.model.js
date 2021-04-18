
module.exports = (sequelize, { DataTypes }) => {
  const Author = sequelize.define("author", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: false
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "/public/images/authors/default.jpg",
    },
    wikiUrl: {
      type: DataTypes.STRING,
      is: /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i
    }
  })

  return Author
}