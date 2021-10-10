import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; // eslint-disable-line

// layouts
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
// homePage
import TrangChu from "./pages/homePage/TrangChu";
import Cart from "./pages/homePage/Shopcart"
import List from "./pages/homePage/List"

import Detail from "./pages/Detail";
import Shop from "./pages/Shop"
// me
import MyHome from "./pages/Me/MyHome";
// admin
import GroupProduct from "./pages/admin/adminGroupProduct"
import GroupUser from "./pages/admin/adminGroupUser"
// myShop
import MyShop from "./pages/myShop/myShop"

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
            <Route path="/list" component={List} />
            <Route path="/shop" component={Shop} />
            <Route path="/myShop" component={MyShop} />
            <Route path="/groupUser" component={GroupUser} />
            <Route path="/groupProduct" component={GroupProduct} />
            <Route path="/me" component={MyHome} />
            <Route path="/cart" component={Cart} />
            <Route path="/detail" component={Detail} />
            <Route path="/" component={TrangChu} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Home;
