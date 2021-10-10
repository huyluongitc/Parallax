import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; // eslint-disable-line

class footer extends Component {
    render() {
        return (
            <footer className="footer-area">
                <div className="container-fluid">
                    <div className="container">
                        <div className="Footer__footer">
                            <div className="logoFooter">
                                <h3 className="hrLogo">⁡⁠⁢</h3>
                                <div className="logo"></div>
                            </div>
                            <div className="default">
                                <div className="aboutFooter">
                                    <h3>GIỚI THIỆU</h3>
                                    <p>PARALLAX NỀN TẢNG MUA SẮM TRỰC TUYẾN MỚI TẠI VIỆT NAM - nền tảng thương mại điện tử, tiên phong thúc đẩy sự phát triển tại khu vực thông qua Thương mại &amp; Công nghệ.</p>
                                </div>
                                <div className="sociFooter">
                                    <h3>liên kết nhanh</h3>
                                    <ul className="list-inline f-social">
                                        <p><Link className="nav-link" to="/"><span className="footer__icon fas fa-angle-double-right"></span>Trang chủ</Link></p>
                                        <p><Link className="nav-link" to="/about"><span className="footer__icon fas fa-angle-double-right"></span>Danh sách sản phẩm</Link></p>
                                    </ul>
                                </div>
                                <div className="infoFooter">
                                    <h3>THÔNG TIN LIÊN LẠC</h3>
                                    <ul className="list-inline f-social">
                                        <p><Link className="nav-link" to=""><span className="footer__icon fa fa-phone"></span>+84 987641162</Link></p>
                                        <p><Link className="nav-link" to=""><span className="footer__icon fa fa-envelope"></span>huyluong.sp@gmail.com</Link></p>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <p className="company-name">© 2021 by <span className="fas fa-angle"> Parallax</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default footer;