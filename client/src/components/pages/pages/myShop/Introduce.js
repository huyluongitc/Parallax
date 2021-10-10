import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import

import callApi from '../../../../utils/apiCaller';

class Introduce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nameShop: "",
      introduce: "",
      address: "",
      prestige: 0,
      dayCreate: "",
      products: [],
      Fler: []
    };
  }
    
  async componentDidMount() {
    const email = localStorage.getItem("email");
    let myShop = await callApi("shop/getShop", "POST", { email: email });
    this.setState({
      id: myShop.data._id,
      nameShop: myShop.data.nameShop,
      introduce: myShop.data.introduce,
      address: myShop.data.address,
      dayCreate: myShop.data.updatedAt.slice(0,10)
    });
    let products = await callApi("product/getProduct", "POST", {idShop: this.state.id})
    this.setState({
      products: products.data
    })
    let FlAll = await callApi("flShop/getAll", "POST", {idShop: this.state.id});
    if (FlAll.data !== "no") {
      this.setState({
        Fler: FlAll.data,
      });
    }
  }

  updateShop = () => {
    document.getElementById("form-shop").style.display = "block"
    document.getElementById("form-introduce").style.display = "none"
  }
  onUpdateShop = async(e) => {
    e.preventDefault()
    const form = document.getElementById("form-shop")
    const name = form.querySelector("#nameShop")
    const message = form.querySelector(".form-message");
    name.addEventListener("focus", (e) => {
      message.innerHTML = "";
    });
    if (name.value.length === 0) {
      message.innerHTML = "Đây là bắt buộc";
    } else {
      const update = await callApi("shop/updateShop", "POST", {
        _id: this.state.id,
        nameShop: this.state.nameShop,
        introduce: this.state.introduce,
        address: this.state.address
      })
      console.log(update);
      window.location.reload();
    }
  }
  onHandleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  RemoveShop = async(Shop) => {
    confirmAlert({
      title: 'Cảnh báo !!!',
      message: 'Bạn có muốn xóa cửa hàng. Tất cả dữ liệu dữ bị mất!!! ',
      buttons: [
        {
          label: 'Đồng ý',
          onClick: async() => {
            for (let i = 0; i < this.state.products.length; i++) {
              let removeProduct = await callApi("product/removeProduct", "POST", {id: this.state.products[i]._id}) // eslint-disable-line
              console.log(this.state.products[i]._id);
            }
            let removeShop = await callApi("shop/remove", "POST", {_id: this.state.id}) // eslint-disable-line
            window.location.reload();
          }
        },
        {
          label: 'Không đồng ý',
          onClick: () => {console.log("quay lại");}
        }
      ]
    });
  }
  countFl =(a,b) => {
    for (let i = 0; i < a.length; i++) {
      b=b+1
    }
    return b
  }
  render() {
    // console.log(this.state);
    let Fl = this.countFl(this.state.Fler,0)
    return (
      <div>
        <div id="form-introduce">
          <div style={{display: "flex"}}>
              <article className="introduce__left">
                  <h3 className="main__label">Mô tả</h3>
                  <p className="main__span">{this.state.introduce}</p>
                  <h3 className="main__label">Địa Chỉ</h3>
                  <p className="main__span">{this.state.address}</p>
              </article>
              <aside className="introduce__right">
                  <h3 className="main__label">Thống kê</h3>
                  <p className="main__span">Đã tham gia vào ngày: {this.state.dayCreate}</p>
                  <p className="main__span">Số lượng người theo dõi: {Fl}</p>
                  <p className="main__span">Độ uy tín: {this.state.prestige}</p>
              </aside>
          </div>
          <button onClick={this.updateShop} className="btn main__btn">Cập nhật thông tin cửa hàng</button>
          <button onClick={this.RemoveShop} className="btn main__btn" style={{backgroundColor: "red"}}>Xóa cửa hàng</button>
        </div>

        <form id="form-shop" style={{ display: "none" }}>
            <div className="form-group">
              <label className="main__label">Tên cửa hàng{" "}<span style={{ color: "red", fontSize: "14px" }}>* bắt buộc</span></label>
              <input onChange={this.onHandleChange} id="nameShop" name="nameShop" value={this.state.nameShop} className="main__input form-control" type="text" />
              <span className="form-message"></span>
            </div>
            <div className="form-group">
              <label className="main__label">Giới thiệu của hàng</label>
              <textarea onChange={this.onHandleChange} value={this.state.introduce} id="introduce" name="introduce" className="main__input form-control" ></textarea>
            </div>
            <div className="form-group">
              <label className="main__label">Địa chỉ</label>
              <input onChange={this.onHandleChange} value={this.state.address} id="address" name="address" className="main__input form-control" type="text" />
            </div>
            <button onClick={()=>window.location.reload()} className="btn main__btn">Trở về</button>
            <button onClick={this.onUpdateShop} className="btn main__btn">Đổi thông tin</button>
          </form>
        
      </div>
    );
  }
}

export default Introduce;