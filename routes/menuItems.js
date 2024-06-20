const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menu");


router.get("/item", menuController.getMenu);
router.get("/order", menuController.orderMenu)




module.exports = router;