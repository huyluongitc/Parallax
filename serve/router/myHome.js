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

const myHome = require("../controllers/myHome/myHome")

router.get("/getdata", myHome.getData);
router.post("/removedata", myHome.removeData);
router.post("/postdata", upload.single("addressImg"), myHome.postData);
router.post("/updatedata", upload.single("addressImg"), myHome.updateData);

module.exports = router;