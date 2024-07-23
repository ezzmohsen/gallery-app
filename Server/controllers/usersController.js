const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getUserById = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(500).send("Error fetching user");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const id = req.user.id;
    const { name, phone, address, password } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (password) updateData.password = await bcrypt.hash(password, saltRounds);

    const updatedProduct = await User.findByIdAndUpdate(id, updateData, {
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
    res.status(500).json({ message: "Error updating user" });
  }
};
