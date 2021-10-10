import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; // eslint-disable-line

import Me from "./Me"
import Bank from "./Bank"
import ChangePass from "./ChangePass"
import Address from "./Address"

class MyHome extends Component {

    constructor(props) {
        super(props)
        this.state={
          nameUser: ""
        }
    }

    async componentDidMount() {
        const nameUser = await localStorage.getItem('nameUser');
        this.setState({
            nameUser: nameUser
        })
    }


    render() {
        return (
            <main className="container">
                <div className="main myHome">
                    <aside className="myHome__menu">
                        <ul className="navbar-nav">
                            <h3 style={{textAlign: "center"}}>Xin chào, <span className="main__caption">{this.state.nameUser}</span></h3>
                            <hr style={{width: "70%", margin: "10px auto"}} />
                            <li className="nav-item">
                                <Link className="nav-link myHome__li" to="/me"><span className="Myhome__icon fas fa-user"></span> Hồ sơ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link myHome__li" to="/me/bank"><p><span className="Myhome__icon fas fa-university"></span> Ngân hàng</p></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link myHome__li" to="/me/address"><p><span className="Myhome__icon fas fa-map-marker-alt"></span> &nbsp;Địa chỉ</p></Link>
                                </li>
                            <li className="nav-item">
                                <Link className="nav-link myHome__li" to="/me/changePass"><p><span className="Myhome__icon fas fa-key"></span> Thay đổi mật khẩu</p></Link>
                            </li>
                        </ul>
                    </aside>
                    <article className="myHome__info">
                        <Switch>
                            <Route path="/me/changePass" component={ChangePass} />
                            <Route path="/me/address" component={Address} />
                            <Route path="/me/bank" component={Bank} />
                            <Route path="/me" component={Me} />
                        </Switch>
                    </article>
                </div>
            </main>
        );
    }
}

export default MyHome;