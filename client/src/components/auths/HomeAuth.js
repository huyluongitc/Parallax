import React, { Component } from 'react';

import HeaderAuth from './layouts/HeaderAuth';
import FooterAuth from './layouts/FooterAuth';
import callApi from "./../../utils/apiCaller";

class Home extends Component {

    // Chuyển Auth
    onChaneAuth = (e) => {
        document.querySelector('.Auth').classList.toggle('s--signup');
    }

    // Kiểm tra dữ liệu
    checkNameUser = (form) => {
        let nameUser = form.querySelector("#nameUser")
        let messagenameUser = nameUser.parentElement.querySelector(".form-message")
        nameUser.addEventListener("focus", (e) => {
            nameUser.classList.remove("invalid")
            messagenameUser.innerHTML=""
        }, true)
        if (nameUser.value.length === 0) {
            nameUser.classList.add("invalid")
            messagenameUser.innerHTML="Vui lòng nhập trường này"
            
        } else {
            nameUser.classList.remove("invalid")
            messagenameUser.innerHTML=""
            return nameUser.value
        }
    }

    checkEmail = (form) => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
        let email = form.querySelector("#email")
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
    
    // submit
    onSubmitLogin = async(e) => {
        e.preventDefault()
        let formLogin = document.querySelector("#form-login")
        let email = await this.checkEmail(formLogin)
        let password = await this.checkPassword(formLogin)
        if (email !== undefined && password !== undefined) {
            const messNotity = await callApi("auth/login","POST",{email,password})
            // show Notity
            this.onNotity(messNotity.data.mess, messNotity.data.type, messNotity.data.duration)
            // natigato slide
            if (messNotity.data.type === "success") {
                localStorage.setItem("email",email)
                setTimeout(()=>{
                    this.props.history.push("/")
                },3000)
            }
        }
    }

    onSubmitRegister = async(e) => {
        e.preventDefault()
        let formRegister = document.querySelector("#form-register")
        let nameUser = await this.checkNameUser(formRegister)
        let email = await this.checkEmail(formRegister)
        let password = await this.checkPassword(formRegister)
        if (nameUser !== undefined && email !== undefined && password !== undefined) {
            const messNotity = await callApi("auth/register","POST",{nameUser,email,password})
            if (messNotity.data.type === "success") {
                console.log(("ok"));
                const upInfo = await callApi("info","POST",{email: email, gender: 0, birthDay: "1990-01-01"}) // eslint-disable-line
            }
            // show Notity
            this.onNotity(messNotity.data.mess, messNotity.data.type, messNotity.data.duration)
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
        return (
            <div>
                <HeaderAuth />
                <div id="toast">
                </div>
                <main className="Auth">
                    <div className="formAuth sign-in">
                        <h2>Chào Mừng Quay Lại,</h2>
                        <form action="/" id="form-login">
                            <div className="form-group">
                                <label>Nhập Email</label>
                                <input id="email" type="email" className="form-control" />
                                <span className="form-message"></span>
                            </div>
                            <div className="form-group">
                                <label>Nhập Mật Khẩu</label>
                                <input id="password" type="password" className="form-control" />
                                <span className="form-message"></span>
                            </div>
                            <p className="forgot-pass">Quên Mật Khẩu?</p>
                            <button onClick={this.onSubmitLogin} type="submit" className="btn btn-login">Đăng Nhập</button>
                            <button type="button" className="btn btn-fb">Kết nối với Facebook</button>
                            <div onClick={this.onChaneAuth} type="button" className="btn Change__mobie">Đăng kí tài khoản</div>
                        </form>
                    </div>
                    <div className="sub-Auth">
                        <div className="effect">
                            <div className="effect__text m--up">
                                <h2>Tạo tài khoản ?</h2>
                                <p>Đăng kí để tham gia và trải nghiệm nhiều tính năng mới</p>
                            </div>
                            <div className="effect__text m--in">
                                <h2>Đã có tài khoản</h2>
                                <p>Nếu bạn đã có tài khoản, chỉ cần đăng nhập. Chúng tôi rất nhớ bạn !</p>
                            </div>
                            <div onClick={this.onChaneAuth} className="effect__btn">
                                <span className="m--up">Đăng Kí</span>
                                <span className="m--in">Đăng Nhập</span>
                            </div>
                        </div>
                        <div className="formAuth sign-up">
                            <h2>Trở Thành Một Thành Viên Của Chúng Tôi,</h2>
                            <form action="/auth" id="form-register">
                                <div className="form-group">
                                    <label>Nhập Tên</label>
                                    <input id="nameUser" type="text" className="form-control" />
                                    <span className="form-message"></span>
                                </div>
                                <div className="form-group">
                                    <label>Nhập Email</label>
                                    <input id="email" type="email" className="form-control" />
                                    <span className="form-message"></span>
                                </div>
                                <div className="form-group">
                                    <label>Nhập Mật Khẩu</label>
                                    <input id="password" type="password" className="form-control" />
                                    <span className="form-message"></span>
                                </div>
                                <button onClick={this.onSubmitRegister} type="submit" className="btn btn-register">Đăng Kí</button>
                                <button onClick={this.onChaneAuth} type="button" className="btn Change__mobie">Đăng nhập tài khoản</button>
                            </form>
                        </div>
                    </div>
                </main>
                <FooterAuth />
            </div>
        );
    }
}

export default Home;