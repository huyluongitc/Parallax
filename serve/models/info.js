const mongoose = require("mongoose")

const account_infoSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: Number
    },
    birthDay: {
        type: String
    },
    telephone: {
        type: Number
    },
    address: {
        type: Array
    },
    bank: {
        type: Object
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("info", account_infoSchema)