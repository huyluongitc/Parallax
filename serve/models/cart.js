const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema ({
    nameProduct: {
        type: String,
        required: true
    },
    idProduct: {
        type: String,
        required: true,
        unique: true
    },
    imageProduct: {
        type: String,
        required: true
    },
    priceProduct: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("cart", accountSchema)