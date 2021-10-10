import React, { Component } from 'react';

import callApi from "./../../../../utils/apiCaller"

class changePass extends Component {

    checkPassword = (form,checkPass) => {
        let password = form.querySelector(checkPass)
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
    onChangePass = async(e) => {
        e.preventDefault()
        let form = document.querySelector("#form-changePass")
        let password = await this.checkPassword(form,"#password")
        let password1 = await this.checkPassword(form,"#password1")
        let passwordComfirm = await this.checkPassword(form,"#passwordComfirm")
        if (password !== undefined && password1 !== undefined && passwordComfirm !== undefined) {
            if (password1 !== passwordComfirm) {
                this.onNotity(
                    "Mật khẩu nhập lại không trùng khớp. Mời nhập lại.",
                    "error",
                    5000
                )
            } else {
                const email = await localStorage.getItem('email');
                const updatePass = await callApi("auth/updatelogin","POST",{email,password,password1})
                this.onNotity(updatePass.data.mess, updatePass.data.type, updatePass.data.duration)
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
        return (
            <div>
                <div id="toast">
                </div>
                <h3 className="main__caption">Thay đổi mật khẩu</h3>
                <p className="main__caption--desc">Để bảo mật tài khoảng, vui lòng không chia sẻ cho người khác</p>
                <hr style={{width: "80%", margin: "10px auto"}} />
                <form id="form-changePass">
                    <div className="form-group">
                        <label className="main__label">Mật khẩu hiện tại:</label>
                        <input className="main__input form-control" type="password" id="password" />
                        <span className="form-message"></span>
                    </div>
                    <div className="form-group">
                        <label className="main__label">Mật khẩu mới:</label>
                        <input className="main__input form-control" type="password" id="password1" />
                        <span className="form-message"></span>
                    </div>
                    <div className="form-group">
                        <label className="main__label">Xác nhận mật khẩu:</label>
                        <input className="main__input form-control" type="password" id="passwordComfirm" />
                        <span className="form-message"></span>
                    </div>
                    <button onClick={this.onChangePass} className="btn main__btn">Xác nhận</button>
                </form>
            </div>
        );
    }
}

export default changePass;