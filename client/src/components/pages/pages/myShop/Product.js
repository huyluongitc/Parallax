import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import

import callApi from '../../../../utils/apiCaller';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idShop: "",
            idList: "",
            products: [],
            listProduct: [],
            addName: "",
            addInfor: "",
            addPrice: 0,
            addSale: 0,
            addQuantity: 0,
            selected: "asc"
        };
    }
    
    async componentDidMount() {
        const email = localStorage.getItem("email");
        let myListProduct = await callApi("getdata", "GET", null);
        this.setState({
            listProduct: myListProduct.data,
            idList: myListProduct.data[0]._id
        });
        let myShop = await callApi("shop/getShop", "POST", { email: email });
        this.setState({
            idShop: myShop.data._id,
        });
        let getProduct = await callApi("product/getproduct", "POST", {idShop: myShop.data._id})
        getProduct.data.sort(this.asc)
        this.setState({
            products: getProduct.data
        })
    }

    onShowPage = (product) => {
        // console.log(product);
        document.querySelector(".admin__table").style.display = "none"
        document.querySelector(".admin__option").style.display = "none"
        const formPage = document.querySelector(".admin__form")
        formPage.style.display = "block"
        if (product !== "") {
            document.getElementById("callAPI").innerHTML = "Sửa"
            this.setState({
                idProduct: product._id,
                idList: product.idListProduct,
                addName: product.nameProduct,
                addInfor: product.ỉntroduceProduct,
                addPrice: product.priceProduct,
                addSale: product.saleProduct,
                addQuantity: product.quantityProduct
            })
        }
    }

    onHandleSumbit = async(obj) => {
        obj.preventDefault()
        const form = document.querySelector(".admin__form")
        const callAPI = document.getElementById("callAPI")
        const addName = await this.check(form,"#addName")
        const addInfor = await this.check(form,"#addInfor")
        const addPrice = await this.check(form,"#addPrice")
        const addSale = await this.check(form,"#addSale")
        const addQuantity = await this.check(form,"#addQuantity")
        const addImg1 = await this.checkImage(form,"#addImg1")
        const addImg2 = await this.checkImage(form,"#addImg2")
        const addImg3 = await this.checkImage(form,"#addImg3")
        console.log(callAPI);
        if (addName !== undefined && addInfor !== undefined && addPrice !== undefined && addSale !== undefined && addQuantity !== undefined && addImg1 !== undefined && addImg2 !== undefined && addImg3 !== undefined) {
            if (callAPI.innerHTML === "Sửa") {
                const updateProduct = await callApi("product/update", "POST", {
                    id: this.state.idProduct,
                    idListProduct: this.state.idList,
                    idShop: this.state.idShop,
                    nameProduct: addName,
                    ỉntroduceProduct: addInfor,
                    imgProduct1: addImg1.name,
                    addressImg1: addImg1,
                    imgProduct2: addImg2.name,
                    addressImg2: addImg2,
                    imgProduct3: addImg3.name,
                    addressImg3: addImg3,
                    priceProduct: addPrice,
                    saleProduct: addSale,
                    quantityProduct: addQuantity,
                })
                console.log(updateProduct);
                window.location.reload();
            } else {
                const createProduct = await callApi("product/createProduct", "POST", {
                    idListProduct: this.state.idList,
                    idShop: this.state.idShop,
                    nameProduct: addName,
                    ỉntroduceProduct: addInfor,
                    imgProduct1: addImg1.name,
                    addressImg1: addImg1,
                    imgProduct2: addImg2.name,
                    addressImg2: addImg2,
                    imgProduct3: addImg3.name,
                    addressImg3: addImg3,
                    priceProduct: addPrice,
                    saleProduct: addSale,
                    quantityProduct: addQuantity,
                })
                console.log(createProduct);
                window.location.reload();
            }
        }
    }
    check = async(form,element) => {
        const obj = form.querySelector(element)
        const mess = obj.parentElement.querySelector(".form-message")
        obj.addEventListener("focus", (e) => {
            mess.innerHTML = ""
        })
        if (obj.value.length === 0) {
            mess.innerHTML = "Mời nhập trường này"
        } else {
            return obj.value
        }
    }
    checkImage = async(form,file) => {
        const obj = form.querySelector(file)
        const mess = obj.parentElement.querySelector(".form-message")
        obj.addEventListener("focus", (e) => {
            mess.innerHTML = ""
        })
        if (obj.files[0] === undefined) {
            mess.innerHTML = "Yêu cầu thêm file"
        } else {
            return obj.files[0]
        }
    }
    onChangeProduct = () => {
        const select = document.getElementById("selectlist")
        this.setState({
            idList: select.value
        })
    }
    RemoveProduct = async(product) => {
        confirmAlert({
            title: 'Cảnh báo !!!',
            message: 'Bạn có muốn xóa ',
            buttons: [
              {
                label: 'Đồng ý',
                onClick: async() => {
                    const removeProduct = await callApi("product/removeProduct", "POST", {id: product})
                    console.log(removeProduct);
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
    ChangeProduct = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }
    navigationDetail = (e) => {
        localStorage.setItem('detail', e);
        this.props.history.push("/detail")
    }

    onFilter = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value
        })
        if (value === "asc") {
            this.state.products.sort(this.asc)
        }
        if (value === "desc") {
            this.state.products.sort(this.desc)
        }
    }

    asc = (a,b) => {
        if (a.slug < b.slug) {
            return -1
        }
        if (a.slug > b.slug) {
            return 1
        }
        return 0
    }
    desc = (a,b) => {
        if (a.slug > b.slug) {
            return -1
        }
        if (a.slug < b.slug) {
            return 1
        }
        return 0
    }

    format2 = (n) => {
        const numberFormat = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        });
        return numberFormat.format(n)
      }

    render() {
        let product = this.state.listProduct.map(product => {
            return <option key={product._id} value={product._id}>{product.nameProduct}</option>
        })
        let elements = this.state.products.map(product => {
            return <tr key={product._id}>
                        <td className="main__label">{product.nameProduct}</td>
                        <td className="main__label">
                            <img style={{height: "100px"}} src={"./images/"+product.imgProduct1} alt="hình ảnh" />
                        </td>
                        <td className="main__label">{this.format2(product.priceProduct)}</td>
                        <td style={{ width: "5%" }}>
                            <i onClick={() => this.navigationDetail(product._id)} title="Xem chi tiết" className="admin__icon fas fa-eye" ></i>
                            {/* <Link to="/detail" style={{color: "black"}}>
                                <i title="Xem chi tiết" className="admin__icon fas fa-eye" ></i>
                            </Link> */}
                        </td>
                        <td style={{ width: "5%" }}>
                            <i onClick={(e) => this.onShowPage(product)} title="Chỉnh sửa" className="admin__icon fas fa-edit"></i>
                        </td>
                        <td style={{ width: "5%" }}>
                            <i title="xóa" onClick={() => this.RemoveProduct(product._id)} className="admin__icon fas fa-trash"></i>
                        </td>
                    </tr>
        })
        return (
            <div>
                <div className="admin__option">
                    <div style={{display: "flex"}}>
                    <h3 className="main__label">Sắp xếp theo</h3>
                    <select name="selected" onChange={this.onFilter} className="main__select">
                        <option value="asc">Từ A-Z</option>
                        <option value="desc">Từ Z-A</option>
                    </select>
                    </div>
                    <button onClick={(e) => this.onShowPage("")} className="admin__btn fas fa-edit">Đăng thêm sản phẩm</button>
                </div>
                <div className="admin__body">
                    <table className="admin__table table table-striped">
                        <thead>
                            <tr>
                            <td style={{ width: "20%", textDecoration: "underline" }} className="main__label" >Tên sản phẩm</td>
                            <td style={{ width: "30%", textDecoration: "underline" }} className="main__label" >Hình ảnh</td>
                            <td style={{ width: "50%", textDecoration: "underline" }} className="main__label" colSpan="3" >giá</td>
                            </tr>
                        </thead>
                        <tbody>
                            {elements}
                        </tbody>
                    </table>
                    <form className="admin__form" encType="multipart/form-data">
                        <div className="form-group">
                            <label className="main__label">Chọn ngành</label>
                            <select value={this.state.idList} onChange={this.onChangeProduct} id="selectlist" className="main__select">
                                {product}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="main__label">Tên sản phẩm</label>
                            <input onChange={this.ChangeProduct} value={this.state.addName} id="addName" name="addName" type="text" className="main__input form-control" />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label className="main__label">Giới thiệu sản phẩm</label>
                            <textarea onChange={this.ChangeProduct} value={this.state.addInfor} id="addInfor" name="addInfor" className="main__input form-control"></textarea>
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label className="main__label">Hình ảnh</label>
                            <input id="addImg1" name="addImg1" type="file" className="main__input form-control" />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <input id="addImg2" name="addImg2" type="file" className="main__input form-control" />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <input id="addImg3" name="addImg3" type="file" className="main__input form-control" />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label className="main__label">Giá sản phẩm: (VNĐ)</label>
                            <input onChange={this.ChangeProduct} value={this.state.addPrice} id="addPrice" name="addPrice" type="number" className="main__input form-control" />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label className="main__label">Giảm giá: % (nếu có)</label>
                            <input onChange={this.ChangeProduct} value={this.state.addSale} id="addSale" name="addSale" type="number" className="main__input form-control" />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label className="main__label">Số lượng cần bán</label>
                            <input onChange={this.ChangeProduct} value={this.state.addQuantity} id="addQuantity" name="addQuantity" type="number" className="main__input form-control" />
                            <span className="form-message"></span>
                        </div>
                        <button onClick={() => window.location.reload()} className="btn main__btn">Trở về</button>
                        <button id="callAPI" type="submit" onClick={this.onHandleSumbit} style={{marginLeft: "10px"}} className="btn main__btn">Lưu</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default Product;