import React from "react"
import {Link} from "react-router-dom"

const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <div className="d-flex align-items-center">
                            <i className="fas fa-home"></i>
                                <span className="ms-2">
                                batdongsan
                           </span>
                            </div>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Trang chủ</Link>
                                </li>
                                <li className="nav-item">
                                    <Link  className="nav-link" to="/">Tin tức</Link>
                                </li>
                                <li className="nav-item">
                                    <Link  className="nav-link" to="/">Nhà đất bán</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Nhà đất cho thuê</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header;