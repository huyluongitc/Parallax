
const listProduct = require("./../../models/listProduct")

class myHome {
    async getData(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let data = await listProduct.find({})
        if (data != null) {
            res.json(data)
        }
    }
    async postData(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const data = new listProduct(req.body)
        data.save()
        res.json("thanh cong")
    }
    async updateData(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let data = await listProduct.findOneAndReplace({nameProduct: req.body.activeName}, {nameProduct: req.body.nameProduct, imgProduct: req.body.imgProduct})
        if (data != null) {
            res.json("oke")
        }
    }
    async removeData(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let data = await listProduct.deleteOne(req.body)
        if (data != null) {
            res.json("oke")
        }
    }
    
}

module.exports = new myHome