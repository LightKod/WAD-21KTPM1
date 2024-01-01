const Cart = require('../../../models/Cart');
const Card = require('../../../models/Card');
exports.CartPage = function(req, res, next) {
  const scripts = [
    '/scripts/cart.js"',
  ];
  const styles = [
    "/styles/cart.css"
  ];
  // const cart = Cart.findOne({userId: req.user.id})
  // const dataRender={
  //   total:cart.totalPrice,
  //   items:[]
  // }
  // cart.items.forEach(async (item)=>{
  //   const card= await Card.findOne({id:item.productId})
  //   const itemData={
  //     tatalprice:item.priece,
  //     amount:item.quantity,
  //   }
  // })
  res.render('user/cart-page', 
  {
    layout: 'user/layouts/layout', 
    title: "Your Shopping Cart",
    scripts: scripts,
    styles: styles,
  });
}