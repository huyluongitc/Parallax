import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; // eslint-disable-line

class HeaderAuth extends Component {
  render() {
    return (
      <header className="headerAuth">
        <div className="container">
          <Link className="navigato" to="/">
            <img src="./images/logo.png" title="Logo" alt="logo-shop" className="logoAuth"></img>
          </Link>
          <span className="txtAuth">Đăng Nhập / Đăng Kí</span>
        </div>  
      </header>
    );
  }
}

export default HeaderAuth;
