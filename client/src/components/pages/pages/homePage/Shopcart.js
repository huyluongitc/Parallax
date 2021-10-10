import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; // eslint-disable-line

import callApi from "../../../../utils/apiCaller";

class Shopcart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }

  async componentDidMount() {
    const email = localStorage.getItem("email")
    const cart = await callApi("cart/get", "POST", {email: email})
    this.setState({
      cart: cart.data
    })
  }

  async componentDidUpdate(e) {
    if (e==="oke") {
      const email = localStorage.getItem("email")
      const cart = await callApi("cart/get", "POST", {email: email})
      this.setState({
        cart: cart.data
      })
    }
  }

  removeCart = async(idProduct) => {
    confirmAlert({
      title: 'Cảnh báo !!!',
      message: 'Bạn có muốn xóa ',
      buttons: [
        {
          label: 'Đồng ý',
          onClick: async() => {
            const removeCart = await callApi("cart/remove", "POST", {_id:idProduct})
            console.log(removeCart);
            window.location.reload()
          }
        },
        {
          label: 'Không đồng ý',
          onClick: () => {console.log("quay lại");}
        }
      ]
    })
  }
  onHandleChangeQuantity = async(e) => {
    const idProduct = document.getElementById(e)
    if (e === idProduct.id) {
      const changeQuantity = await callApi("cart/change", "POST", {_id: e, quantity: idProduct.value}) // eslint-disable-line
      // console.log(changeQuantity);
      this.componentDidUpdate("oke")
    }
  }

  total = () => {
    let total = 0
    for (let i = 0; i < this.state.cart.length; i++) {
      total = total + (this.state.cart[i].quantity * this.state.cart[i].priceProduct)
    }
    return total
  }

  navigationDetail = (e) => {
    localStorage.setItem('detail', e);
    this.props.history.push("/detail")
}
  onSubmit = async(e) => {
    const email = localStorage.getItem("email")
    const submitCart = await callApi("cart/removeAll", "POST", {email}) // eslint-disable-line
    window.location.reload()
  }

  render() {
    const elements = this.state.cart.map(e=>{
      return  <tr key={e._id} >
                <td className="cart__display"> 
                    <img src={"./images/"+e.imageProduct} alt="img-cart" className="cart__img" />
                    <h4 style={{marginLeft: "5px"}} className="main__span">{e.nameProduct}</h4>
                </td>
                <td className="main__span">{e.priceProduct} VNĐ</td> 
                <td>
                  <input id={e._id} onChange={()=>this.onHandleChangeQuantity(e._id)} className="form-control main__input text-center" min={1} defaultValue={e.quantity} type="number" />
                </td> 
                <td className="text-center main__span">{e.priceProduct * e.quantity} VNĐ</td> 
                <td className="actions" data-th>  
                  <button title="Xem chi tiết" onClick={()=>this.navigationDetail(e.idProduct)} className="btn btn-info"><i className="fa fa-eye" />
                  </button> 
                  <button title="Xóa sản phẩm" onClick={()=>this.removeCart(e._id)} style={{marginLeft: "5px"}} className="btn btn-danger"><i className="far fa-trash-alt" />
                  </button>
                </td> 
              </tr>
    })
    return  <div className="container">
              <div className="main">
                <h3 style={{textAlign: "center"}} className="main__caption">Giỏ hàng của bạn</h3>
                <hr style={{ width: "80%", margin: "10px auto" }} />
                <table className="table table-hover table-condensed"> 
                  <thead> 
                    <tr> 
                      <th className="main__label" style={{width: '35%'}}>Tên sản phẩm</th> 
                      <th className="main__label" style={{width: '20%'}}>Giá</th> 
                      <th className="main__label" style={{width: '15%'}}>Số lượng</th> 
                      <th style={{width: '20%'}} className="text-center main__label">Thành tiền</th> 
                      <th style={{width: '10%'}}> </th> 
                    </tr> 
                  </thead> 
                  <tbody>
                    {elements}
                  </tbody>

                  <tfoot> 
                    <tr> 
                      <td><Link className="nav-link" to="/"><button className="main__span btn btn-warning"><i className="fa fa-angle-left" /> Tiếp tục mua hàng</button></Link>
                      </td> 
                      <td colSpan={2} style={{textAlign: "right"}} className="main__span">Tổng tiền:</td>
                      <td className="main__span text-center">{this.total()} VNĐ</td> 
                      <td><button onClick={this.onSubmit} className="main__span btn btn-success btn-block">Thanh toán <i className="fa fa-angle-right" /></button>
                      </td> 
                    </tr> 
                  </tfoot> 
                </table>
              </div>
            </div>;
  }
}
export default Shopcart;
