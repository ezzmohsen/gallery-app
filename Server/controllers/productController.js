const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.json(product);
    } catch (error) {
      res.status(500).send('Error fetching product');
    }
  };


