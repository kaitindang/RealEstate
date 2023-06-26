import React from "react"
import {Link, useNavigate} from "react-router-dom"

const Header = () => {

    const navigate = useNavigate();

    const onClick = (e) =>{
        if(localStorage.getItem("accessToken")!= null){
            alert("Bạn hiện đang đăng nhập");
        }else{
            navigate("/login");
        }
    }
    const onLogout = (e) =>{
        e.preventDefault();
        if(localStorage.getItem("accessToken") == null){
            alert("Bạn hiện không đăng nhập")
        }else{
            localStorage.removeItem("accessToken");
            localStorage.removeItem("id");
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
                                    <Link  className="nav-link" to="/productlist">Quản lý tin đăng</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-realestate"><button type="button" class="btn btn-outline-danger">Đăng tin</button></Link>
                                </li>

                                <li className="nav-item">
                                    <button onClick={(e) => onClick(e)} className="nav-link" >Đăng nhập</button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={(e) => onLogout(e)} className="nav-link" >Đăng xuất</button>
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