const db = require("../models");
const Book = db.books;

const add = async (req, res) => {
  try {
    const { ean, title, description, release_date, pages, height, width, thickness, weight, format, language, image, isAvailable } = req.body;
    const data = await Book.create({
      ean, title, description, release_date, pages, height, width, thickness, weight, format, language, image, isAvailable
    });
    return res.status(200).json(data);
  } catch({ message }) {
    console.error({ message });
  }
}

module.exports = {
  add
}