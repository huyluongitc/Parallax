
const Cart = require("./../../models/cart")

class MyCart {

    // create cart
    async create(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let data = await Cart.findOne({idProduct: req.body.idProduct})
        if (data === null) {
            const myCart = Cart(req.body)
            myCart.save()
            res.json({
                mess:"Đã thêm vào giỏ hàng.",
                type:"success",
                duration:1000
            })
        } else {
            res.json({
                mess:"Sản phẩm đã được thêm vào giỏ hàng",
                type:"error",
                duration:2000
            })
        }
    }

    // get cart
    async get(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let data = await Cart.find({email: req.body.email})
        if (data !== null) {
            res.json(data)
        }
    }

    // remove cart
    async remove(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let data = await Cart.findByIdAndDelete({_id: req.body._id})
        if (data !== null) {
            res.json("oke")
        }
    }

    // removeAll cart
    async removeAll(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let data = await Cart.deleteMany({email: req.body.email})
        if (data !== null) {
            res.json("oke")
        }
    }

    // change cart
    async change(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let data = await Cart.findByIdAndUpdate({_id: req.body._id}, {quantity: req.body.quantity})
        if (data !== null) {
            res.json("oke")
        }
    }
}

module.exports = new MyCart