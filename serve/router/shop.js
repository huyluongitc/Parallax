const express = require("express");
const router = express.Router();

const shop = require("../controllers/shop/shop")

router.post("/createShop", shop.createShop);
router.post("/getShop", shop.getShop);
router.post("/getId", shop.getId);
router.post("/updateShop", shop.updateShop);
router.post("/remove", shop.remove);


module.exports = router;