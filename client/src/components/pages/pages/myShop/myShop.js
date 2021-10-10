import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; // eslint-disable-line

import Introduce from "./Introduce"
import Follower from "./Follower"
import Product from "./Product"
import callApi from "../../../../utils/apiCaller";

class MyShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nameShop: "",
      introduce: "",
      address: "",
      prestige: 0,
      dayCreate: ""
    };
  }

  async componentDidMount() {
    const email = localStorage.getItem("email");
    let myShop = await callApi("shop/getShop", "POST", { email: email });
    if (myShop.data !== "NO") {
      this.setState({
        id: myShop.data._id,
        nameShop: myShop.data.nameShop,
        introduce: myShop.data.introduce,
        address: myShop.data.address,
        dayCreate: myShop.data.updatedAt.slice(0,10)
      });
    }
  }

  onShowForm = (e) => {
    const noneShop = document.getElementById("none-shop");
    const formShop = document.getElementById("form-shop");
    noneShop.style.display = "none";
    formShop.style.display = "block";
  };

  onHandleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onCreateShop = async (e) => {
    e.preventDefault();
    const formShop = document.getElementById("form-shop");
    const nameShop = formShop.querySelector("#nameShop");
    const message = formShop.querySelector(".form-message");
    nameShop.addEventListener("focus", (e) => {
      message.innerHTML = "";
    });
    if (nameShop.value.length === 0) {
      message.innerHTML = "Mời nhập tên cửa hàng";
    } else {
      console.log(this.state);
      const email = localStorage.getItem("email");
      const name = this.state;
      const createShop = await callApi("shop/createShop", "POST", {
        email: email,
        nameShop: nameShop.value,
        introduce: name.introduce,
        address: name.address,
        prestige: 0,
      });
      console.log(createShop);
      window.location.reload();
    }
  };
  onHandleChangeShop = (e) => {
    const menu1 = document.querySelector("#menu1")
    const menu2 = document.querySelector("#menu2")
    const menu3 = document.querySelector("#menu3")
    if (e.target === menu1) {
      menu1.style.color = "var(--primary-color)"
      menu2.style.color = "#333"
      menu3.style.color = "#333"
    }
    if (e.target === menu2) {
      menu1.style.color = "#333"
      menu2.style.color = "var(--primary-color)"
      menu3.style.color = "#333"
    }
    if (e.target === menu3) {
      menu1.style.color = "#333"
      menu2.style.color = "#333"
      menu3.style.color = "var(--primary-color)"
    }
  }

  render() {
    // console.log(this.state);
    return (
      <div className="container">
        <div className="main">
          <div className="main__caption" style={{ fontWeight: "700" }}>
            Cửa hàng của bạn
          </div>
          <hr style={{ width: "80%", margin: "10px auto" }} />
          {this.state.nameShop === "" ? (
            <div>
              <div id="none-shop">
                <h3 className="main__label">Bạn chưa tạo cửa hàng của mình:{" "}</h3>
                <span className="main__caption--desc">Có muốn tạo cửa hàng</span>
                <button onClick={this.onShowForm} className="btn main__btn2">Tạo cửa hàng</button>
              </div>
              <form id="form-shop" style={{ display: "none" }}>
                <div className="form-group">
                  <label className="main__label">Tên cửa hàng{" "}<span style={{ color: "red", fontSize: "14px" }}>* bắt buộc</span></label>
                  <input id="nameShop" name="nameShop" className="main__input form-control" type="text" />
                  <span className="form-message"></span>
                </div>
                <div className="form-group">
                  <label className="main__label">Giới thiệu của hàng</label>
                  <textarea onChange={this.onHandleChange} id="introduce" name="introduce" className="main__input form-control" ></textarea>
                  <span className="form-message"></span>
                </div>
                <div className="form-group">
                  <label className="main__label">Địa chỉ</label>
                  <input onChange={this.onHandleChange} id="address" name="address" className="main__input form-control" type="text" />
                  <span className="form-message"></span>
                </div>
                <button onClick={this.onCreateShop} className="btn main__btn">Mở cửa hàng</button>
              </form>
            </div>
          ) : (
            <div>
              <label style={{display: "flex", color: "black"}} className="main__label">Tên cửa hàng: {this.state.nameShop}</label>
              <ul onClick={this.onHandleChangeShop} className="nav shop__ul">
                <li className="shop__li nav-item">
                  <Link id="menu1" style={{color: "var(--primary-color"}} className="shop__text" to="/myShop" >Sản phẩm</Link>
                </li>
                <li className="shop__li nav-item">
                  <Link id="menu2" className="shop__text" to="/myShop/follower" >Người đã theo dõi</Link>
                </li>
                <li className="shop__li nav-item">
                  <Link id="menu3" className="shop__text" to="/myShop/introduce" >Giới thiệu</Link>
                </li>
              </ul>

              <div className="shop__body">
                <Switch>
                  <Route path="/myShop/follower" component={Follower} />
                  <Route path="/myShop/introduce" component={Introduce} />
                  <Route path="/myShop" component={Product} />
                </Switch>
              </div>
            </div>
          )}
        </div>

        
      </div>
    );
  }
}

export default MyShop;
