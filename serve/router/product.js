const express = require("express");
const router = express.Router();
const path = require("path")
const multer = require("multer")

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./../client/public/images")
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage})

const product = require("../controllers/product/product")

router.post("/createProduct", upload.single("addressImg1","addressImg2","addressImg3"), product.createProduct);
router.post("/Product", product.Product);
router.post("/getProduct", product.getProduct);
router.post("/removeProduct", product.removeProduct);
router.post("/update", product.update);
router.get("/getAll", product.getAll);

module.exports = router;