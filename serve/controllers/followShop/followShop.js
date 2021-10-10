
const FlShop = require("./../../models/followShop")

class Shop {

    // create Follow Shop
    async create(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const fl = new FlShop(req.body)
        fl.save()
        res.json("oke")
    }

    // get one Follow Shop
    async get(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const fl = await FlShop.findOne({idShop: req.body.idShop, email: req.body.email})
        if (fl !== null) {
            res.json(fl)
        } else {
            res.json("no")
        }
    }

    // getAll Follow Shop
    async getAll(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const fl = await FlShop.find({idShop: req.body.idShop})
        if (fl !== null) {
            res.json(fl)
        } else {
            res.json("no")
        }
    }

    // remove Follow Shop
    async remove(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const fl = await FlShop.findOneAndDelete({idShop: req.body.idShop, email: req.body.email})
        if (fl !== null) {
            res.json(fl)
        } else {
            res.json("no")
        }
    }

}

module.exports = new Shop