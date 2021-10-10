const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema ({
    idProduct: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nameUser: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("review", accountSchema)