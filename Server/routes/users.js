const { Router } = require("express");
const usersControllers = require("../controllers/usersController");

const router = Router();

router.get("", usersControllers.getUserById);
router.put("", usersControllers.updateUser);

module.exports = router;
