const { Router } = require("express");
const ordersRouter = require("./orders");
const productsRouter = require("./products");
const usersRouter = require("./users");
const adminRouter = require("./admin");
const authRouter = require("./auth");
const { authenticateToken } = require("../middleware/authentication");
const { authorizeAdmin } = require("../middleware/authorization");

const router = Router();

router.get("/health-check", (req, res) => {
  res.send("Server is running");
});

router.use("/auth", authRouter);
router.use("/admin", authenticateToken, authorizeAdmin, adminRouter);
router.use("/users", authenticateToken, usersRouter);
router.use("/products", productsRouter);
router.use("/orders", authenticateToken, ordersRouter);

module.exports = router;
