const db = require("../models");
const Author = db.authors;
const { getPagination, getPaginationData } = require("../helpers/global");

const add = async (req, res) => {
  try {
    const { name, bio, wikiUrl } = req.body;
    const data = await Author.create({ name, bio, wikiUrl });
    return res.status(200).json(data);
  } catch ({ message }) {
    console.error({ message });
  }
};

const findAll = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(size, page);
    const authors = await Author.findAndCountAll({ limit, offset });
    const response = getPaginationData(authors, page, limit);
    return res.status(200).json(response);
  } catch ({ message }) {
    console.error({ message });
    return res.status(500).send("Error server");
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findOne({ where: { id } });
    if (!author) {
      return res.status(401).send("Author not found!");
    }
    return res.status(200).json({ author });
  } catch ({ message }) {
    console.error({ message });
    return res.status(500).send("Error server");
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.destroy({ where: { id } });
    return res.status(200).send({ deletedAuthor });
  } catch({ message }) {
    console.error({ message });
    return res.status(500).send("Error server");
  }
};

module.exports = {
  add,
  findAll,
  findOne,
  destroy
};
