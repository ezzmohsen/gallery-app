const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, image, category, status } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      image,
      category,
      status,
    });

    await newProduct.save();
    res.status(201).send("Product created");
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, image, category, status } =
      req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (stock) updateData.stock = stock;
    if (image) updateData.image = image;
    if (category) updateData.category = category;
    if (status) updateData.status = status;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error" });
    }
    res.status(500).json({ message: "Error updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).send("Error fetching orders");
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).send("Product not found");
    }
    res.json(order);
  } catch (error) {
    res.status(500).send("Error fetching order");
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderItemsId, orderStatus } = req.body;
    const updateData = {};
    if (orderItemsId) {
      let orderItems = [];
      let orderTotal = 0;

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
      }
      updateData.orderItems = orderItems;
      updateData.orderTotal = orderTotal;
    }

    if (orderStatus) updateData.orderStatus = orderStatus;

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error" });
    }
    res.status(500).json({ message: "Error updating product" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
};
