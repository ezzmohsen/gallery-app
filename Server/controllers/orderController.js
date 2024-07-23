const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

const { v4: uuidv4 } = require("uuid");

exports.getAllOrders = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const orders = await Order.find({
      customerEmail: userEmail,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).send("Error fetching orders");
  }
};

exports.createOrder = async (req, res) => {
  const { orderItemsId } = req.body;
  if (!orderItemsId || orderItemsId.length === 0) {
    return res.status(400).send("orderItems empty");
  }
  const userId = req.user.id;

  try {
    const orderNumber = uuidv4();
    const orderStatus = "pending";
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address: customerAddress,
    } = user;

    let orderItems = [];
    let orderTotal = 0;
    let exit = false;
    let badProduct = "";

    for (let i = 0; i < orderItemsId.length; i++) {
      const product = await Product.findById(orderItemsId[i].id);
      if (!product) {
        return res
          .status(404)
          .send(`Product id:${orderItemsId[i].id} not found`);
      }

      const productId = orderItemsId[i].id;
      const { name: productName, price } = product;
      const productPrice = Number(price);
      const productQuantity = Number(orderItemsId[i].quantity);
      if (productQuantity === 0) {
        continue;
      }
      const productSubtotal = Number(
        (productPrice * productQuantity).toFixed(2)
      );
      orderTotal += productSubtotal;

      orderItems.push({
        productId,
        productName,
        productPrice,
        productQuantity,
        productSubtotal,
      });
      const stock = Number(product.stock) - productQuantity;
      if (stock < 0) {
        exit = true;
        badProduct = productName;
        break;
      }
      await Product.findByIdAndUpdate(
        orderItemsId[i].id,
        { stock },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    if (exit) {
      return res
        .status(400)
        .send(`${badProduct} not enough stock for your order`);
    }
    if (orderItems.length === 0) {
      return res.status(400).send(`order cart is empty`);
    }
    const newOrder = new Order({
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      orderStatus,
      orderItems,
      orderTotal,
    });

    await newOrder.save();
    res.status(201).send("Order created");
  } catch (error) {
    res.status(500).send("Error creating order");
  }
};
