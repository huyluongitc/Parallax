import React, { Component } from 'react';

import callApi from '../../../../utils/apiCaller';

class List extends Component {
    constructor(props) {
        super(props)
        this.state={
            listProduct : [],
            listArray: [],
            products: [],
            start:0,
            end: 2,
            count:0,
            selected: "",
            idHandleList: "",
            nameHandleList: "Tất cả"
        }
    }

    async componentDidMount() {
        let listProduct = await callApi("getdata","GET",null)
        this.setState({
            listProduct: listProduct.data
        })
        for (let i = 0; i < listProduct.data.length; i++) {
            this.setState({count: this.state.count + 1}) // eslint-disable-line
        }
        this.onLoadMore()
        let products = await callApi("product/getAll", "GET", null)
        this.setState({
            products: products.data
        })
    }

    showList = async(start,end) => {
        const showArray = this.state.listProduct.slice(start,end)
        this.setState({
            listArray: [...this.state.listArray,...showArray]
        })

    }
    onLoadMore = async() => {
        this.showList(this.state.start,this.state.end)
        this.setState({
            start: this.state.end,
            end: this.state.end + 3
        })
        if (this.state.end>=this.state.count) {
            document.getElementById("showList").style.display = "none"
        }
    }

    onDetail = (e) => {
        localStorage.setItem('detail', e);
        this.props.history.push("/detail")
    }
    format2 = (n) => {
        const numberFormat = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        });
        return numberFormat.format(n)
    }
    onChangeFilter = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value
        })
        if (value === "priceAsc") {
            this.state.products.sort(this.PriceAsc)
        }
        if (value === "priceDesc") {
            this.state.products.sort(this.PriceDesc)
        }
    }
    PriceAsc = (a,b) => {
        if (a.priceProduct < b.priceProduct) {
            return -1
        }
        if (a.priceProduct > b.priceProduct) {
            return 1
        }
        return 0
    }
    PriceDesc = (a,b) => {
        if (a.priceProduct > b.priceProduct) {
            return -1
        }
        if (a.priceProduct < b.priceProduct) {
            return 1
        }
        return 0
    }

    onHandleList = (id,name) => {
        console.log(id,name);
        this.setState({
            idHandleList: id,
            nameHandleList: name
        })
        
    }

    render() {
        // console.log(this.state.products);
        let products = this.state.products.map((product) => { // eslint-disable-line
            if (this.state.idHandleList === "") {
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
            } else {
                if (this.state.idHandleList === product.idListProduct) {
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
                }
            }
        })
        let listProduct = this.state.listArray.map(e=>{
            return <li key={e._id} onClick={()=>this.onHandleList(e._id,e.nameProduct)} className="list__li main__span">{e.nameProduct}</li>
        })
        return (
            <div className="container">
                <div className="main list">
                    <aside className="list__aside">
                        <p className="main__label">Danh mục</p>
                        <hr style={{ width: "80%", margin: "10px auto" }} />
                        <ul>
                            <li onClick={()=>this.onHandleList("","Tất cả")} className="list__li main__span">Tất cả</li>
                            {listProduct}
                            <button onClick={this.onLoadMore} id="showList" className="btn text-center main__span">Xem thêm</button>
                        </ul>
                    </aside>
                    <article className="list__article">
                        <p className="main__label text-center">Danh sách sản phẩm</p>
                        <p className="main__span">Đang chọn: {this.state.nameHandleList}</p>
                        <hr style={{ width: "80%", margin: "10px auto" }} />
                        <div className="list__SX">
                            <label className="main__span">Sắp xếp theo:</label>
                            <select name="selected" onChange={this.onChangeFilter} className="main__select">
                                <option>Giá</option>
                                <option value="priceAsc">Giá từ thấp đến cao</option>
                                <option value="priceDesc">Giá từ cao đến thấp</option>
                            </select>
                        </div>
                        <div style={{margin: "10px auto"}} className="danhchoban row">
                            {products}
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}


export default List;