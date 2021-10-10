import React, { Component } from 'react';

import callApi from "./../../../../utils/apiCaller"

class Me extends Component {

    constructor(props) {
        super(props)
        this.state={
            nameUser: "",
            email: "",
            gender: 0,
            birthday: "",
            telephone: 0
        }
    }

    async componentDidMount() {
        const nameUser = await localStorage.getItem('nameUser');
        const email = await localStorage.getItem('email');
        const getInformation = await callApi("info/getinfor","POST",{email:email})
        this.setState({
            nameUser: nameUser,
            email: email,
            telephone: getInformation.data.telephone,
            gender: getInformation.data.gender,
            birthday: getInformation.data.birthDay
        })
    }

    onSdt = async(e) => {
        const onSdt = document.getElementById("sdt")
        const offSdt = e.target
        offSdt.style.display= "none"
        onSdt.style.display = "flex"
    }

    onEmail = async(e) => {
        const formInfor = document.getElementById("form__info")
        const formEmail = document.getElementById("form__email")
        formInfor.style.display = "none"
        formEmail.style.display = "block"
    }
    onHandleChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name] : value
        })
    }
    onHandleSubmit = async(obj) => {
        obj.preventDefault()
        let name = this.state
        console.log(name.email);
        localStorage.setItem("nameUser",name.nameUser)
        const updateName = await callApi("auth/updateName", "POST", {email: name.email, nameUser: name.nameUser})
        const updateInfor = await callApi("info/updateinfor","POST", {email: name.email, gender: name.gender, birthDay: name.birthday})
        console.log(updateName);
        console.log(updateInfor);
        window.location.reload();
    }
    onHandleSubmitTelephone = async(obj) => {
        obj.preventDefault()
        const messNotity = document.querySelector(".form-message")
        const onSdt= document.getElementById("sdt")
        onSdt.addEventListener("focus", (e) => {
            messNotity.innerHTML=""
        }, true)
        if (this.state.telephone === undefined) {
            messNotity.innerHTML = "Mời nhập số điện thoại"
        } else {
            if (this.state.telephone.length !== 10) {
                messNotity.innerHTML = "Số điện thoại bắt buộc phải 10 chữ số"
            } else {
                messNotity.innerHTML = ""
                const updateTelephone = await callApi("info/updateinfor","POST", {email: this.state.email, telephone: this.state.telephone})
                console.log(updateTelephone);
                window.location.reload();
            }
        }
    }

    checkEmail = (form,checkEmail) => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
        let email = form.querySelector(checkEmail)
        let messageEmail = email.parentElement.querySelector(".form-message")
        email.addEventListener("focus", (e) => {
            email.classList.remove("invalid")
            messageEmail.innerHTML=""
        }, true)
        if (email.value.length === 0) {
            email.classList.add("invalid")
            messageEmail.innerHTML="Vui lòng nhập trường này"
            
        } else {
            if (regex.test(email.value) === false) {
                email.classList.add("invalid")
                messageEmail.innerHTML="Trường này phải là Email"
            } else {
                email.classList.remove("invalid")
                messageEmail.innerHTML=""
                return email.value
            }
        }
    }

    checkPassword = (form) => {
        let password = form.querySelector("#password")
        let messagePassword = password.parentElement.querySelector(".form-message")
        password.addEventListener("focus", (e) => {
            password.classList.remove("invalid")
            messagePassword.innerHTML=""
        }, true)
        if (password.value.length === 0) {
            password.classList.add("invalid")
            messagePassword.innerHTML="Vui lòng nhập trường này"
        } else {
            if (password.value.length < 6) {
                password.classList.add("invalid")
                messagePassword.innerHTML="Mật khẩu tối thiểu phải bằng 6 kí tự"
            } else {
                password.classList.remove("invalid")
                messagePassword.innerHTML=""
                let password1 = password.value
                password.value=""
                return password1
            }
        }
        
    }
    onHandleChangeEmail = async(e) => {
        e.preventDefault()
        let formEmail = document.getElementById("form__email")
        let email = await this.checkEmail(formEmail,"#email")
        let email1 = await this.checkEmail(formEmail,"#email1")
        let password = await this.checkPassword(formEmail)
        if (email !== undefined && email1 !== undefined && password !== undefined) {
            const messNotity = await callApi("auth/changeEmail","POST",{email,email1,password})
            console.log(messNotity.data);

            // show Notity
            this.onNotity(messNotity.data.mess, messNotity.data.type, messNotity.data.duration)

            // natigato slide
            if (messNotity.data.type === "success") {
                const messNotity = await callApi("info/changeEmail","POST",{email,email1})
                console.log(messNotity.data);
                localStorage.setItem("email",email1)
                setTimeout(()=>{
                    window.location.reload();
                },1500)
            }
        }
    }

    // thông báo
    onNotity = (messNotity='', type="success" ,duration=3000) => {
        const main = document.getElementById("toast")
        if (main) {
            const toast = document.createElement("div")

            // auto Remove
            const autoRemoveId = setTimeout(()=>{
                main.removeChild(toast)
            }, duration + 1000)

            // click Remove
            toast.onclick = (e) => {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast)
                    clearTimeout(autoRemoveId)
                }
            }

            const icons = {
                success:"fa-check-circle",
                error:"fa-exclamation-triangle"
            }
            const icon = icons[type]
            const delay = (duration / 1000).toFixed(2)
            toast.classList.add("toast", `toast--${type}`)
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`
            toast.innerHTML = `
                <div class="toast__icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="toast__body">
                    <p>${messNotity}</p>
                </div>
                <div class="toast__close">
                    <i class="fas fa-times"></i>
                </div>
                `;
            main.appendChild(toast)
        }
    }

    render() {
        const telephone = this.state.telephone
        const email = "**********"+this.state.email.slice(-13)
        return (
            <div>
                <div id="toast">
                </div>
                <h3 className="main__caption">Hồ sơ của tôi</h3>
                <p className="main__caption--desc">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                <hr style={{width: "80%", margin: "10px auto"}} />
                <form id="form__info">
                    <div className="form-group">
                        <label className="main__label">Tên đăng nhập:</label>
                        <input className="main__input form-control" onChange={this.onHandleChange} placeholder={this.state.nameUser} name="nameUser" type="text" />
                    </div>
                    <div className="form-group">
                        <label className="main__label">Email:</label>
                        <span className="main__span"> {email} </span><span className="main__spanBtn" onClick={this.onEmail}>Thay đổi</span>
                    </div>
                    <div className="form-group">
                        <label className="main__label">Số điện thoại:</label>
                        {telephone !== undefined ? (<span className="main__label"> {telephone} <span style={{marginLeft: "5px"}} className="main__spanBtn" onClick={this.onSdt}>Thay đổi</span></span>) :
                            (<span style={{marginLeft: "5px"}} className="main__spanBtn" onClick={this.onSdt}>Thêm</span>)
                        }
                        <div id="sdt" style={{display: "none"}}>
                            <input onChange={this.onHandleChange} name="telephone" className="main__input form-control" type="number" />
                            <button className="btn main__btn2" onClick={this.onHandleSubmitTelephone}>Lưu</button>
                        </div>
                        <p className="form-message"></p>
                    </div>
                    <div className="form-group">
                        <label className="main__label">Giới tính:</label>
                        <select className="main__select" onChange={this.onHandleChange} name="gender" value={this.state.gender}>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Nam</option>
                            <option value={2}>Nữ</option>
                            <option value={3}>Khác</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="main__label">Ngày sinh:</label>
                        <input onChange={this.onHandleChange} value={this.state.birthday} name="birthday" className="main__date" type="date" />
                    </div>
                    <button className="btn main__btn" onClick={this.onHandleSubmit}>Lưu</button>
                </form>
                <form id="form__email" style={{display: "none"}}>
                    <div className="form-group">
                        <label className="main__label">Nhập email hiện tại:</label>
                        <input id="email" className="main__input form-control" type="text" />
                        <span className="form-message"></span>
                    </div>
                    <div className="form-group">
                        <label className="main__label">Nhập email thay đổi:</label>
                        <input id="email1" className="main__input form-control" type="text" />
                        <span className="form-message"></span>
                    </div>
                    <div className="form-group">
                        <label className="main__label">Xác nhận mật khẩu:</label>
                        <input id="password" className="main__input form-control" type="password" />
                        <span className="form-message"></span>
                    </div>
                    <button className="btn main__btn" onClick={()=> window.location.reload()}>Trở lại</button>
                    <button className="btn main__btn" onClick={this.onHandleChangeEmail}>Thay đổi</button>
                </form>
            </div>
        );
    }
}

export default Me;