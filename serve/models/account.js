const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema ({
    nameUser: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("accounts", accountSchema)