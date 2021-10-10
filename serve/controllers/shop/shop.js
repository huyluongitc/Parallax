
const Shops = require("./../../models/shop")

class myShop {

    // create Shop
    async createShop(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const shop = new Shops(req.body)
        shop.save()
        res.json("oke")
    }

    // get Shop
    async getShop(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const shop = await Shops.findOne({email: req.body.email})
        if (shop !== null) {
            res.json(shop)
        } else {
            res.json("NO")
        }
    }

    // get Id
    async getId(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const shop = await Shops.findById({_id: req.body._id})
        if (shop !== null) {
            res.json(shop)
        } else {
            res.json("NO")
        }
    }

    // update Shop
    async updateShop(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const shop = await Shops.findByIdAndUpdate({_id: req.body._id}, req.body)
        if (shop !== null) {
            res.json(shop)
        } else {
            res.json("NO")
        }
    }

    // remove shop
    async remove(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const shop = await Shops.findByIdAndDelete({_id: req.body._id})
        if (shop !== null) {
            res.json(shop)
        } else {
            res.json("NO")
        }
    }

}

module.exports = new myShop