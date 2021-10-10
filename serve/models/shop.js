const mongoose = require("mongoose")

const account_infoSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nameShop: {
        type: String,
        required: true
    },
    introduce: {
        type: String
    },
    address: {
        type: String
    },
    prestige: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("shop", account_infoSchema)