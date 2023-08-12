import React from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {

    const navigate = useNavigate();

    const onClick = (e) => {
        if (localStorage.getItem("accessToken") != null) {
            alert("Bạn hiện đang đăng nhập");
        } else {
            navigate("/login");
        }
    }
    const onLogout = (e) => {
        e.preventDefault();
        if (localStorage.getItem("accessToken") == null) {
            alert("Bạn hiện không đăng nhập")
        } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("id");
            localStorage.removeItem("role");
            navigate("/login")
        }
    }

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
                        <div className="navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">

                                <li className="nav-item">
                                    <Link className="nav-link" to="search/searchbyfilter?price_start=&price_end=&room_start=&room_end=&area_start=&area_end=&floor_spaceStart=&floor_spaceEnd=&address=&listing_categories=&listing_type=1">Mua bán</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/search/searchbyfilter?price_start=&price_end=&room_start=&room_end=&area_start=&area_end=&floor_spaceStart=&floor_spaceEnd=&address=&listing_categories=&listing_type=2">Cho thuê</Link>
                                </li>                               

                                {!localStorage.getItem("accessToken") ?
                                    <li className="nav-item">
                                        <button onClick={(e) => onClick(e)} className="nav-link" >Đăng nhập</button>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <div class="dropdown">
                                            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                Xin chào, {localStorage.getItem("username")}
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li><Link className="dropdown-item" to={`/view-user/${localStorage.getItem("id")}`}>Thông tin tài khoản</Link></li>
                                                <li><Link className="dropdown-item" to="/productlist">Quản lý tin đăng</Link></li>
                                                <li><Link className="dropdown-item" onClick={(e) => onLogout(e)}>Đăng xuất</Link></li>
                                            </ul>
                                        </div>
                                    </li>
                                }

                                {!localStorage.getItem("accessToken") ?
                                    <li className="nav-item">
                                        <button onClick={(e) => onLogout(e)} className="nav-link" >Đăng ký</button>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        
                                    </li>
                                }

                                <li className="nav-item">
                                    <Link to="/add-realestate"><button type="button" class="btn btn-outline-danger" data-mdb-ripple-color="dark">Đăng tin</button></Link>
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