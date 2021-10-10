const express = require("express");
const router = express.Router();

const cart = require("../controllers/cart/cart")

router.post("/create", cart.create);
router.post("/get", cart.get);
router.post("/remove", cart.remove);
router.post("/removeAll", cart.removeAll);
router.post("/change", cart.change);

module.exports = router;