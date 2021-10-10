const express = require("express");
const router = express.Router();

const flShop = require("./../controllers/followShop/followShop")

router.post("/create", flShop.create);
router.post("/get", flShop.get);
router.post("/getAll", flShop.getAll);
router.post("/remove", flShop.remove);

module.exports = router;