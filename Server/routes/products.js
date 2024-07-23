const { Router } = require("express");
const productsControllers = require("../controllers/productController")

const router = Router();

router.get("", productsControllers.getAllProducts);
router.get("/:id", productsControllers.getProductById);


module.exports = router;
