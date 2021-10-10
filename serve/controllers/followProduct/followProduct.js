
const FlProduct = require("./../../models/followProduct")

class Product {

    // create Follow Product
    async create(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const fl = new FlProduct(req.body)
        fl.save()
        res.json("oke")
    }

    // get one Follow Product
    async get(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const fl = await FlProduct.findOne({idProduct: req.body.idProduct, email: req.body.email})
        if (fl !== null) {
            res.json(fl)
        } else {
            res.json("no")
        }
    }

    // getAll Follow Product
    async getAll(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const fl = await FlProduct.find({idProduct: req.body.idProduct})
        if (fl !== null) {
            res.json(fl)
        } else {
            res.json("no")
        }
    }

    // remove Follow Product
    async remove(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const fl = await FlProduct.findOneAndDelete({idProduct: req.body.idProduct, email: req.body.email})
        if (fl !== null) {
            res.json(fl)
        } else {
            res.json("no")
        }
    }

}

module.exports = new Product