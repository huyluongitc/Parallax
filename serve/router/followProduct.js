const express = require("express");
const router = express.Router();

const flProduct = require("./../controllers/followProduct/followProduct")

router.post("/create", flProduct.create);
router.post("/get", flProduct.get);
router.post("/getAll", flProduct.getAll);
router.post("/remove", flProduct.remove);

module.exports = router;