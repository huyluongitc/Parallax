
const Information = require("./../../models/info")

class Info {

    // changeEmail
    async changeEmail(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let account = await Information.findOneAndUpdate({email: req.body.email}, {email: req.body.email1})
        if (account !== null) {
            res.json("oke")
        }
    }

    // post
    async postInfor(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        const infor = Information(req.body)
        infor.save()
        res.json("oke post")
    }

    // thêm address
    async upAddress(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        let infor = await Information.findOneAndUpdate({email: req.body.email}, {$push: {address: req.body.address}})
        if (infor != null) {
            res.json("oke")
        }
    }

    // xóa address
    async removeAddress(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        let infor = await Information.findOneAndUpdate({email: req.body.email}, {$pull: {address: req.body.element}})
        if (infor != null) {
            res.json("oke")
        }
    }

    // lấy address 
    async getInfor(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        let infor = await Information.findOne({email: req.body.email})
        if (infor != null) {
            res.json(infor)
        }
    }

    // thêm thông tin
    async updateInfor(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        let inFor = await Information.findOneAndUpdate({email: req.body.email}, req.body)
        if (inFor != null) {
            res.json("oke")
        } else {
            res.json("no")
        }
    }
}

module.exports = new Info