exports.getProductsByFilter = async (filters) => {
    try {
      // Xử lý logic để lấy sản phẩm dựa trên filters
      // Ví dụ: Lấy sản phẩm dựa trên giá và danh mục
      const { category, price } = filters;
      let query = {};
  
      if (category) {
        query.category = category;
      }
      if (price) {
        query.price = { $lte: parseInt(price) }; // Ví dụ: Lấy sản phẩm có giá nhỏ hơn hoặc bằng giá được filter
      }
  
      const filteredProducts = await Product.find(query); // Query để lấy sản phẩm dựa trên điều kiện filters
      return filteredProducts; // Trả về danh sách sản phẩm sau khi lọc
    } catch (error) {
      throw new Error('Error fetching filtered products from database: ' + error.message); // Xử lý lỗi nếu có
    }
  };