const Card = require('../../../models/Card');
exports.getProductsByFilter = async (filterString, page = 1, perPage = 24, sort = { updateAt: 1 }) => {
  try {
    const filters = JSON.parse(filterString||'{}');
    console.log(filters)
    const allFilteredProducts = await Card.find(filters).sort(sort);
    const allCard = await Card.find();
    const skip = (page - 1) * perPage;
    const filteredProducts = allFilteredProducts.slice(skip, skip + perPage);

    // Tính số lượng thẻ bài theo từng loại "rarity"
    const rarityCounts = [];
    allCard.forEach(card => {
      const rarity = card.rarity;
      const existingRarity = rarityCounts.find(item => item.name === rarity);

      if (rarity) {
        if (!existingRarity) {
          if( filters?.rarity && filters.rarity.includes(rarity)) {
              rarityCounts.push({ name: rarity, count: 1, checked: true });
          }
          else {
            rarityCounts.push({ name: rarity, count: 1, checked: false });
          }
        } else {
          existingRarity.count++;
        }
      }
    });

    const totalProducts = allFilteredProducts.length;
    const totalPages = Math.ceil(totalProducts / perPage);
    // console.log(filteredProducts);
    // console.log(rarityCounts);
    // console.log(totalPages);
    return {
      products: filteredProducts,
      rarityCounts: rarityCounts,
      totalPages: totalPages
    };
  } catch (error) {
    throw new Error('Error fetching filtered products from database: ' + error.message);
  }
};