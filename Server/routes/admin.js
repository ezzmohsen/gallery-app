const { Router } = require("express");
const adminController = require("../controllers/adminController");

const router = Router();

router.post("/products", adminController.createProduct);
router.put("/products/:id", adminController.updateProduct);
router.delete("/products/:id", adminController.deleteProduct);

router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.delete("/users/:id", adminController.deleteUser);

router.get("/orders", adminController.getAllOrders);
router.get("/orders/:id", adminController.getOrderById);
router.put("/orders/:id", adminController.updateOrder);
router.delete("/orders/:id", adminController.deleteOrder);

module.exports = router;
