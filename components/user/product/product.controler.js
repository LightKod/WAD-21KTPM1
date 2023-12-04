const ProductService = require('./product.service')

exports.getProducts = async (req, res) => {
  try {
    const filters = req.query.filters;
    const page = req.query.page || 1; // Lấy trang từ query string hoặc mặc định là 1
    const perPage = 24;
    const sort =req.query.sort ;
    console.log('filter',filters)
    console.log('page',page)
    console.log('sort',sort)
    const filteredProductsData = await ProductService.getProductsByFilter(filters, page, perPage, sort);

    res.render('user/product-page', {
      products: filteredProductsData.products,
      rarityCounts: filteredProductsData.rarityCounts,
      page : page,
      totalPages: filteredProductsData.totalPages,
      sortName: filteredProductsData.sortName
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
