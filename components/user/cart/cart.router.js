const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // Import function v4 từ thư viện uuid
const controller = require('./card.controller')
const Cart = require('../../../models/Cart');
const Order = require('../../../models/Order');
const OrderDetail = require('../../../models/OrderDetail');
/* GET home page. */
router.get('/', controller.CartPage);
router.post('/add-to-cart', async (req, res) => {
    try {
        const {  productId, quantity, price } = req.body; // Nhận thông tin về user ID, product ID và số lượng sản phẩm từ request body
        const userId = req.user.id;
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng của người dùng hay chưa
        let cart = await Cart.findOne({ userId:userId });

        // Nếu giỏ hàng không tồn tại, tạo giỏ hàng mới
        if (!cart) {
            cart = new Cart({ userId: userId, items: [] ,totalPrice: 0});
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingProductIndex = cart.items.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng sản phẩm
            cart.items[existingProductIndex].quantity += parseFloat(quantity);
            cart.items[existingProductIndex].price += parseFloat(price)
            cart.totalPrice += parseFloat(price)
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
            cart.items.push({ productId: productId, quantity: quantity, price: price });
            cart.totalPrice += parseFloat(price)
        }

        // Lưu giỏ hàng đã cập nhật vào cơ sở dữ liệu
        const updatedCart = await cart.save();

        res.status(200).json({ message: 'Product added to cart successfully', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/update-cart-item', async (req, res) => {
    try {
        const { productId, quantity,price } = req.body; // Nhận thông tin về user ID, product ID và số lượng sản phẩm từ request body
        const userId = req.user.id;
        // Tìm giỏ hàng của người dùng
        let cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingProduct = cart.items.find(item => item.productId === productId);

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Cập nhật số lượng sản phẩm
        existingProduct.quantity = quantity;
        cart.totalPrice += (parseFloat(price)-existingProduct.price)
        existingProduct.price = price;
        // Lưu giỏ hàng đã cập nhật vào cơ sở dữ liệu
        const updatedCart = await cart.save();

        res.status(200).json({ message: 'Cart item quantity updated successfully', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/checkout', async (req, res) => {
    try {
      const userId= req.user.id;
      const cart = await Cart.findOne({ userId: userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      if (cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }

  
      // Tạo đơn hàng mới với ID độc nhất
      const newOrder = new Order({
        id: uuidv4(), // Tạo ID độc nhất cho đơn hàng
        userId: userId,
        status: 'unpaid',
        totalPrice: cart.totalPrice
      });
      const savedOrder = await newOrder.save();
  
      const orderID = savedOrder.id;
  
      // Tạo các chi tiết đơn hàng từ orderDetails và lưu vào cơ sở dữ liệu
      const orderDetailPromises = cart.items.map(async (detail) => {
        const { productId, quantity, price } = detail;
  
        const newOrderDetail = new OrderDetail({
          id: uuidv4(), 
          orderId: orderID,
          cardId: productId,
          quantity: quantity,
          totalPrice: price
        });
  
        return await newOrderDetail.save();
      });
  
      // Đợi cho tất cả các chi tiết đơn hàng được lưu
      await Promise.all(orderDetailPromises);
  
      res.status(201).json({ message: 'Checkout successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;
