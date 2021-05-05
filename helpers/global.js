const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page*limit : 0;

  return { limit, offset };
}

const getPaginationData = (res, page, limit) => {
  const { count: totalItems, rows: data } = res;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, data, currentPage, totalPages };
}

module.exports = {
  getPagination,
  getPaginationData
}