const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator")

mongoose.plugin(slug)

const accountSchema = new mongoose.Schema ({
    idListProduct: {
        type: String,
        required: true
    },
    idShop: {
        type: String,
        required: true
    },
    nameProduct: {
        type: String,
        required: true
    },
    ỉntroduceProduct: {
        type: String,
        required: true
    },
    imgProduct1: {
        type: String,
        required: true
    },
    imgProduct2: {
        type: String,
        required: true
    },
    imgProduct3: {
        type: String,
        required: true
    },
    priceProduct: {
        type: Number,
        required: true
    },
    saleProduct: {
        type: Number,
        required: true
    },
    quantityProduct: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        slug: 'nameProduct',
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("product", accountSchema)