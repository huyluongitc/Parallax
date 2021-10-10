
const auth = require("./auth")
const myHome = require("./myHome")
const info = require("./info")
const shop = require("./shop")
const product = require("./product")
const review = require("./review")
const followProduct = require("./followProduct")
const followShop = require("./followShop")
const cart = require("./cart")

function route(app) {
    app.use('/cart', cart)
    app.use('/flShop', followShop)
    app.use('/flProduct', followProduct)
    app.use('/review', review)
    app.use('/product', product)
    app.use('/shop', shop)
    app.use('/info', info)
    app.use('/auth', auth)
    app.use('/', myHome)
}

module.exports = route