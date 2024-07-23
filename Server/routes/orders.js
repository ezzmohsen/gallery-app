const { Router } = require("express");
const ordersControllers = require("../controllers/orderController")

const router = Router();

router.get("", ordersControllers.getAllOrders);
router.post("", ordersControllers.createOrder);

module.exports = router;