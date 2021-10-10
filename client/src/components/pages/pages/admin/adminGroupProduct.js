import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import

import callApi from "../../../../utils/apiCaller";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedFile: null
    };
  }
  async componentDidMount() {
    let product = await callApi("getdata", "GET", null);
    product = product.data.sort(this.asc)
    this.setState({
      products: product,
    });
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

  onShowPage = async(name) => {
    const showForm = document.querySelector(".admin__form")
    const onNew = document.querySelector(".admin__btn")
    showForm.style.display = "block"
    onNew.style.display = "none"
    const nameProduct = showForm.querySelector("#nameProduct")
    const activeName = showForm.querySelector(".activeName")
    const adminApi = showForm.querySelector("#adminApi")
    const messNotity = showForm.querySelector(".form-message")
    showForm.addEventListener("focus", (e) => {
      messNotity.innerHTML=""
    }, true)
    if (name !== "") {
      activeName.innerHTML = "Chọn sửa: " + name
      nameProduct.value = name
      let active = name
      adminApi.innerHTML="Sửa"
      adminApi.onclick = (e) => {
        e.preventDefault()
        if (nameProduct.value.length !== 0 && this.state.selectedFile !== null) {
          let formData = new FormData()
          formData.append("activeName", active)
          formData.append("nameProduct", nameProduct.value)
          formData.append("addressImg", this.state.selectedFile)
          formData.append("imgProduct", this.state.selectedFile.name)
          const addProduct = callApi("updatedata","POST", formData)
          console.log(addProduct);
          window.location.reload();
        } else {
          messNotity.innerHTML = "Mời nhập đầy đủ dữ liệu"
        }
      }
    } else {
      adminApi.onclick = (e) => {
        e.preventDefault()
        if (nameProduct.value.length !== 0 && this.state.selectedFile !== null) {
          let formData = new FormData()
          formData.append("nameProduct", nameProduct.value)
          formData.append("addressImg", this.state.selectedFile)
          formData.append("imgProduct", this.state.selectedFile.name)
          const addProduct = callApi("postdata","POST", formData)
          console.log(addProduct);
          window.location.reload();
        } else {
          messNotity.innerHTML = "Mời nhập đầy đủ dữ liệu"
        }
      }
    }
  }
  onChangeFile = (e) => {
    this.setState({
      selectedFile: e.target.files[0]
    })
  }

  onRemovePage = (nameProduct) => {
    confirmAlert({
      title: 'Cảnh báo !!!',
      message: 'Bạn có muốn xóa ' + nameProduct,
      buttons: [
        {
          label: 'Đồng ý',
          onClick: async() => {
            const removePage = await callApi("removedata", "POST", {nameProduct: nameProduct})
            console.log(removePage);
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

  render() {
    let elements = this.state.products.map((product) => {
      return (
        <tr key={product.nameProduct}>
          <td className="main__label">{product.nameProduct}</td>
          <td>
            <img className="admin__img" src={"./images/" + product.imgProduct} alt="hình ảnh" />
          </td>
          <td style={{ width: "5%" }}>
            <i onClick={(e) => this.onShowPage(product.nameProduct)} title="Chỉnh sửa" className="admin__icon fas fa-edit"></i>
          </td>
          <td style={{ width: "5%" }}>
            <i onClick={(e) => this.onRemovePage(product.nameProduct)} title="xóa" className="admin__icon fas fa-trash"></i>
          </td>
        </tr>
      );
    });
    return (
      <div className="container">
        <div className="main">
          <div className="main__caption" style={{fontWeight: "700"}}>Nhóm sản phẩm</div>
          <hr style={{ width: "80%", margin: "10px auto" }} />
          <div className="admin__option">
            <div style={{display: "flex"}}>
              <h3 className="main__label">Sắp xếp theo</h3>
              <select onChange={this.onFilter} className="main__select">
                <option value="asc">Từ A-Z</option>
                <option value="desc">Từ Z-A</option>
              </select>
            </div>

            <button onClick={(e) => this.onShowPage("")} className="admin__btn fas fa-edit">
              Đăng thêm ngành
            </button>
          </div>
          <div className="admin__body">
            <table className="admin__table table table-striped">
              <thead>
                <tr>
                  <td style={{ width: "30%", textDecoration: "underline" }} className="main__label">Tên sản phẩm</td>
                  <td style={{ width: "60%", textDecoration: "underline" }} className="main__label" colSpan="3">Hình ảnh</td>
                </tr>
              </thead>
              <tbody>{elements}</tbody>
            </table>
            <form className="admin__form" encType="multipart/form-data" >
              <p className="activeName main__label"></p>
              <div className="form-group">
                <label className="main__label">Tên Ngành</label>
                <input id="nameProduct" type="text" required className="main__input form-control" />
              </div>
              <div className="form-group">
                <label className="main__label">Hình ảnh</label>
                <input onChange={this.onChangeFile} id="imgProduct" type="file" required className="main__input form-control" />
              </div>
              <p className="form-message"></p>
              <button id="adminApi" className="btn main__label">Lưu</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
