const express = require("express");
const router = express.Router();

const review = require("../controllers/review/review")

router.post("/create", review.create);
router.post("/get", review.get);
router.post("/me", review.me);
router.post("/update", review.update);

module.exports = router;