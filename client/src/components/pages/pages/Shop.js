import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; // eslint-disable-line

import callApi from "../../../utils/apiCaller";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      id: "",
      nameShop: "",
      introduce: "",
      address: "",
      prestige: 0,
      dayCreate: "",
      follow: false,
      Fler: [],
    };
  }

  async componentDidMount() {
    const shop = localStorage.getItem("shop");
    const email = localStorage.getItem("email");
    let myShop = await callApi("shop/getId", "POST", { _id: shop });
    if (myShop.data !== "NO") {
      this.setState({
        id: myShop.data._id,
        nameShop: myShop.data.nameShop,
        introduce: myShop.data.introduce,
        address: myShop.data.address,
        dayCreate: myShop.data.updatedAt.slice(0, 10),
      });
    }

    let getProduct = await callApi("product/getproduct", "POST", {idShop: myShop.data._id});
    this.setState({
      products: getProduct.data,
    });

    let Fl = await callApi("flShop/get", "POST", {email: email,idShop: this.state.id});
    if (Fl.data !== "no") {
      this.setState({
        follow: true,
      });
    }

    let FlAll = await callApi("flShop/getAll", "POST", {idShop: this.state.id});
    if (FlAll.data !== "no") {
      this.setState({
        Fler: FlAll.data,
      });
    }
  }

  async componentDidUpdate(e) {
    if (e==="oke") {
      let FlAll = await callApi("flShop/getAll", "POST", {idShop: this.state.id});
      if (FlAll.data !== "no") {
        this.setState({
          Fler: FlAll.data,
        });
      }
    }
  }

  onChangeFL = async (e) => {
    const onFl = document.getElementById("onFlShop");
    const offFl = document.getElementById("offFlShop");
    const email = localStorage.getItem("email");
    const nameUser = localStorage.getItem("nameUser");
    if (e.target.closest(".btn.main__btn") === onFl) {
      let Fl = await callApi("flShop/create", "POST", { email: email, nameUser: nameUser, idShop: this.state.id}); // eslint-disable-line
      this.componentDidUpdate("oke")

      // console.log(Fl);
    }
    if (e.target.closest(".btn.main__btn") === offFl) {
      let Fl = await callApi("flShop/remove", "POST", { email: email, idShop: this.state.id}); // eslint-disable-line
      this.componentDidUpdate("oke")
      // console.log(Fl);
    }
    this.setState({
      follow: !this.state.follow,
    });
  };

  countFl =(a,b) => {
    for (let i = 0; i < a.length; i++) {
        b=b+1
    }
    return b
  }

  render() {
    let Fl = this.countFl(this.state.Fler,0)
    // console.log(this.state);
    let elements = this.state.products.map((product) => {
      return (
        <tr key={product._id}>
          <td className="main__label">{product.nameProduct}</td>
          <td className="main__label">
            <img
              style={{ height: "100px" }}
              src={"./images/" + product.imgProduct1}
              alt="hình ảnh"
            />
          </td>
          <td className="main__label">{product.priceProduct} VNĐ</td>
          <td style={{ width: "5%" }}>
            <Link to="/detail" style={{ color: "black" }}>
              <i title="Xem chi tiết" className="admin__icon fas fa-eye"></i>
            </Link>
          </td>
        </tr>
      );
    });
    return (
      <div className="container">
        <div className="main">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label className="main__label">
              Tên cửa hàng: {this.state.nameShop}
            </label>
            {this.state.follow === false ? (
              <button
                onClick={this.onChangeFL}
                id="onFlShop"
                className="btn main__btn"
              >
                Theo dõi
              </button>
            ) : (
              <button
                style={{ backgroundColor: "gray" }}
                onClick={this.onChangeFL}
                id="offFlShop"
                className="btn main__btn"
              >
                Bỏ theo dõi
              </button>
            )}
          </div>
          <hr style={{ width: "80%", margin: "10px auto" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <label className="main__label">Giới thiệu về cửa hàng</label>
              <p className="main__span">{this.state.introduce}</p>
              <label className="main__label">Địa chỉ</label>
              <p className="main__span">{this.state.address}</p>
            </div>
            <div>
              <label className="main__label">Thống kê</label>
              <p className="main__span">
                Đã tham gia vào ngày: {this.state.dayCreate}
              </p>
              <p className="main__span">Số lượng người theo dõi: {Fl}</p>
              <p className="main__span">Độ uy tín: {this.state.prestige}</p>
            </div>
          </div>
          <hr style={{ width: "80%", margin: "10px auto" }} />
          <label className="main__label">Sản phẩm của cửa hàng</label>
          <table className="admin__table table table-striped">
            <thead>
              <tr>
                <td
                  style={{ width: "20%", textDecoration: "underline" }}
                  className="main__label"
                >
                  Tên sản phẩm
                </td>
                <td
                  style={{ width: "30%", textDecoration: "underline" }}
                  className="main__label"
                >
                  Hình ảnh
                </td>
                <td
                  style={{ width: "50%", textDecoration: "underline" }}
                  className="main__label"
                  colSpan="2"
                >
                  giá
                </td>
              </tr>
            </thead>
            <tbody>{elements}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Shop;
