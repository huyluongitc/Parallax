
const Review = require("./../../models/review")

class Data {

    // create review
    async create(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const data = new Review(req.body)
        data.save()
        res.json("oke")
    }

    // get review
    async get(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let data = await Review.find({idProduct: req.body.idProduct})
        if (data !== null) {
            res.json(data)
        } else {
            res.json("no")
        }
    }

    // my review
    async me(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const data = await Review.findOne({idProduct: req.body.idProduct, email:req.body.email})
        if (data !== null) {
            res.json(data)
        } else {
            res.json("no")
        }
    }

    // update
    async update(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const data = await Review.findByIdAndUpdate({_id: req.body.id},{star: req.body.star, content: req.body.content})
        if (data !== null) {
            res.json(data)
        } else {
            res.json("no")
        }
    }
}

module.exports = new Data