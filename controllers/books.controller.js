const db = require("../models");
const Book = db.books;
const { getPagination, getPaginationData } = require("../helpers/global")

const add = async (req, res) => {
  try {
    const {
      ean,
      title,
      description,
      release_date,
      pages,
      height,
      width,
      thickness,
      weight,
      format,
      language,
      image,
      isAvailable,
    } = req.body;
    const data = await Book.create({
      ean,
      title,
      description,
      release_date,
      pages,
      height,
      width,
      thickness,
      weight,
      format,
      language,
      image,
      isAvailable,
    });
    return res.status(200).json(data);
  } catch ({ message }) {
    console.error({ message });
  }
};

const findAll = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(size, page);
    const books = await Book.findAndCountAll({
      limit,
      offset
    });
    const response = getPaginationData(books, page, limit);
    return res.status(200).json(response);
  } catch({ message }) {
    console.error({ message });
    return res.status(500).send("Error server");
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ where: { id } });
    if(!book) {
      return res.status(401).send("Book not found!");
    }
    return res.status(200).json({ book });
  } catch({ message }) {
    console.error({ message });
    return res.status(500).send("Error server");
  }

}

module.exports = {
  add,
  findAll,
  findOne
};
