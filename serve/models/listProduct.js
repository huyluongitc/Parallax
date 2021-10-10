const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator")

mongoose.plugin(slug)

const accountSchema = new mongoose.Schema ({
    nameProduct: {
        type: String,
        required: true,
        unique: true
    },
    imgProduct: {
        type: String,
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

module.exports = mongoose.model("list_product", accountSchema)