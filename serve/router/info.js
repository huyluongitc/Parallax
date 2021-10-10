const express = require("express");
const router = express.Router();

const info = require("../controllers/info/info")

router.post("/changeEmail", info.changeEmail);
router.post("/getinfor", info.getInfor);
router.post("/updateinfor", info.updateInfor);
router.post("/upaddress", info.upAddress);
router.post("/removeaddress", info.removeAddress);
router.post("/", info.postInfor);

module.exports = router;