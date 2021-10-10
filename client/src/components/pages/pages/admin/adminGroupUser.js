import React, { Component } from "react";
// import { confirmAlert } from 'react-confirm-alert'; // Import

import callApi from "../../../../utils/apiCaller";

class AdminUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  async componentDidMount() {
    let users = await callApi("auth", "GET", null);
    this.setState({
      users: users.data,
    });
  }

  render() {
    let elements = this.state.users.map((user) => {
      return (
        <tr key={user._id}>
          <td className="main__label">{user.nameUser}</td>
          <td className="main__label">{user.email}</td>
          <td style={{ width: "5%" }}>
            <i title="Xóa" className="admin__icon fas fa-trash"></i>
          </td>
        </tr>
      );
    });
    return (
      <div className="container">
        <div className="main">
          <div className="main__caption" style={{fontWeight: "700"}}>Quản lí người dùng</div>
          <hr style={{ width: "80%", margin: "10px auto" }} />

          <div className="admin__body">
            <table className="admin__table table table-striped">
              <thead>
                <tr>
                  <td style={{ width: "40%", textDecoration: "underline" }} className="main__label">Tên người dùng</td>
                  <td style={{ width: "55%", textDecoration: "underline" }} className="main__label" colSpan="2">Địa chỉ email</td>
                </tr>
              </thead>
              <tbody>{elements}</tbody>
            </table>
            <form className="admin__form" >
              <div className="form-group">
                <label className="main__label">Tên người dùng</label>
                <input id="nameProduct" type="text" className="main__input form-control" />
              </div>
              <div className="form-group">
                <label className="main__label">Email người dùng</label>
                <input id="nameProduct" type="text" className="main__input form-control" />
              </div>
              <div className="form-group">
                <label className="main__label">Mật khẩu</label>
                <input id="imgProduct" type="file" className="main__input form-control" />
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

export default AdminUser;
