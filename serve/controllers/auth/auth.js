
const Account = require("./../../models/account")

class Auth {

    // change Email
    async changeEmail(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let account = await Account.findOneAndUpdate({email: req.body.email, password: req.body.password}, {email: req.body.email1})
        if (account !== null) {
            res.json({
                mess:"Đổi email thành công.",
                type:"success",
                duration:1000
            })
        } else {
            res.json({
                mess:"Email hoặc mật khẩu không trùng khớp. Mời nhập lại.",
                type:"error",
                duration:5000
            })
        }
    }

    // change NameUser
    async updateNameUser(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let account = await Account.findOneAndUpdate({email: req.body.email}, {nameUser: req.body.nameUser})
        if (account !== null) {
            res.json("oke")
        }
    }

    // get all user
    async getUser(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let account = await Account.find({})
        if (account != null) {
            res.json(account)
        }
    }

    // get one user
    async getLogin(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let account = await Account.findOne({email: req.body.email})
        if (account != null) {
            res.json(account)
        }
    }

    // login
    async postLogin(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let account = await Account.findOne({email: req.body.email, password: req.body.password})
        if (account !== null) {
            res.json({
                mess:"Đăng nhập thành công. Đang điều hướng về trang chủ.",
                type:"success",
                duration:2000
            })
        } else {
            res.json({
                mess:"email hoặc mật khẩu sai. Mời kiểm tra lại.",
                type:"error",
                duration:5000
            })
        }
    }

    // update password
    async updateLogin(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let account = await Account.findOneAndUpdate({email: req.body.email, password: req.body.password}, {password: req.body.password1})
        if (account !== null) {
            res.json({
                mess:"Đổi mật khẩu thành công.",
                type:"success",
                duration:2000
            })
        } else {
            res.json({
                mess:"Sai mật khẩu. Mời nhập lại.",
                type:"error",
                duration:5000
            })
        }
    }

    // register
    async postRegister(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let account = await Account.findOne({email: req.body.email})
        if (account !== null) {
            res.json({
                mess:"Email đã tồn tại. Mời nhập lại.",
                type:"error",
                duration:3000
            })
        } else {
            const newAccount = new Account(req.body)
            newAccount.save()
            res.json({
                mess: "Đăng ký thành công. Mời đăng nhập.",
                type:"success",
                duration:5000
            })
        }

    }
}

module.exports = new Auth