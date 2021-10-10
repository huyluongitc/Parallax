import React, { Component } from "react";
import Banner from "./Banner";

import callApi from "../../../../utils/apiCaller";

class TrangChu extends Component {
  constructor(props) {
    super(props)
    this.state={
      listProduct : [],
      products: []
    }
  }

  async componentDidMount() {
    let listProduct = await callApi("getdata","GET",null)
      this.setState({
        listProduct: listProduct.data
      })
    let products = await callApi("product/getAll", "GET", null)
      this.setState({
          products: products.data
      })
  }

  onDetail = (e) => {
    localStorage.setItem('detail', e);
    this.props.history.push("/detail")
  }
  
  onList = (e) => {
    this.props.history.push("/list")
  }

  format2 = (n) => {
    const numberFormat = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return numberFormat.format(n)
  }

  render() {
    let elements = this.state.listProduct.map((e) => {
      return  <li style={{cursor: "pointer"}} onClick={()=>this.onList(e._id)} key={e._id}>
                <div className="card ">
                  <div className="card__img">
                    <img className="img__product" src={"./images/"+e.imgProduct} alt="hình sản phẩm" />
                  </div>
                  <div className="card__text">
                    <h6 className="text__product">{e.nameProduct}</h6>
                  </div>
                </div>
              </li>
    })
    let elements1 = this.state.products.slice(0,6).map((product) => {
      return  <li style={{cursor: "pointer"}} title="Xem chi tiết" key={product._id} onClick={()=>this.onDetail(product._id)} className="col-lg-2 col-md-3 col-sm-4">
                <div className="card ">
                  <div className="card__img">
                    <img className="img__product" src={"./images/"+product.imgProduct1} alt="hình sản phẩm" />
                  </div>
                  <div className="card__text">
                    <h6 className="text__product">{product.nameProduct}</h6>
                    <h6 className="text__priceup"><span className="text__price-sale">{this.format2(product.priceProduct-(product.priceProduct*product.saleProduct/100))}</span></h6>
                    <h6 className="text__pricedown">
                      <span className="text__vnd"></span>
                      <span className="text__price-cost">{this.format2(product.priceProduct)}</span>
                      <span className="text__percent"> -{product.saleProduct}%</span>
                    </h6>
                  </div>
                </div>
              </li>
    })
    return (
      <main className="container">
        <Banner />
        <div className="homedanhmuc">
          <div style={{textAlign: "center", paddingTop: "10px"}} className="main__label">DANH MỤC</div>
          <ul className="danhmuc">
            {elements}
          </ul>
        </div>
        <div>
          <div className="homedanhchoban">
            <div className="main__label text-center">DÀNH CHO BẠN</div>
            <ul className="danhchoban row" >
              {elements1}
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

export default TrangChu;
