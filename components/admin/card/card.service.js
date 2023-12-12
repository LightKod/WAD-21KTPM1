const Card = require("../../../models/Card");

exports.GetAllCards = async () => {
  try {
    const card = await Card.find();
    return card;
  } catch (error) {
    throw new Error(
      "Error fetching filtered products from database: " + error.message
    );
  }
};


exports.GetCard = async (id) => {
  const card = await Card.findOne({ id: id });
  return card;
}
