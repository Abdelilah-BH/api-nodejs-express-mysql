const db = require("../models");
const Category = db.categories;
const { getPagination, getPaginationData } = require("../helpers/global");

const add = async (req, res) => {
  try {
    const { name, description, parentId } = req.body;
    const data = await Category.create({ name, description, parentId });
    return res.status(200).json(data);
  } catch ({ message }) {
    console.error({ message });
  }
};

const findAll = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(size, page);
    const categories = await Category.findAndCountAll({ limit, offset });
    const response = getPaginationData(categories, page, limit);
    return res.status(200).json(response);
  } catch ({ message }) {
    console.error({ message });
    return res.status(500).send("Error server");
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return res.status(401).send("Author not found!");
    }
    return res.status(200).json({ category });
  } catch ({ message }) {
    console.error({ message });
    return res.status(500).send("Error server");
  }
};

module.exports = {
  add,
  findAll,
  findOne,
};
