module.exports = (sequelize, { DataTypes }) => {
  const Book = sequelize.define("Book", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    ean: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        len: [8, 13]
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 55
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
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
      }
    },
    pages: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    height: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    },
    width: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    },
    thickness: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    },
    format: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["livre de Poche", "digest", "roman A5", "A4"]],
      }
    },
    language: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["francais", "anglais", "arabe"]]
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "/public/images/authors/default.jpg",
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  })

  return Book;
}