const ProductService = require('./product.service')

exports.getProductsByFilter = async (req, res) => {
    try {
      const filters = req.query; // Lấy các giá trị filter từ query string
      const filteredProducts = await ProductService.getProductsByFilter(filters); // Gọi hàm từ ProductService với filters
      res.json(filteredProducts); // Trả về danh sách sản phẩm được lọc
    } catch (error) {
      res.status(500).json({ message: error.message }); // Xử lý lỗi nếu có
    }
  };