import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams, Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Sidebar from '../../client/Sidebar';
import UserService from './UserService';

const ViewUser = (props) => {

    const [account, setAccount] = useState({
        id: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        dateOfBirth: "",
        phone: "",
        avatar: ""
    });

    const { id } = useParams();

    const handleChange = (e) => {
        const value = e.target.value;
        setAccount({ ...account, [e.target.name]: value });
    }


    useEffect(() => {

        UserService.getUserById(id).then((response) => {
            console.log(response.data)
            setAccount(response.data)
        }).catch(error => {
            console.log(error)
        })

    }, [])

    const HideEdit = () => {
        var id = localStorage.getItem("id");
        if (account.id == id) {
          return <td className="text-left px-6 py-4 whitespace-nowrap">Chỉnh sửa</td>
        }
        else {
          return <span></span>
        }
    
      }

    return (
        <div className='row'>
            <div class="col-sm-3">
                <Sidebar />
            </div>


            <div class="col-sm-9">

                <div class="container emp-profile">
                    <form method="post">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="profile-img">
                                    <img src={account.avatar} alt="" />                                  
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="profile-head">
                                    <h3>
                                        <b>{account.username}</b>
                                    </h3>

                                    <h6>
                                        Môi giới viên
                                    </h6>

                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <button class="nav-link active" id="hone-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="false">Thông tin</button>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <Link className="item-title" to={`/edit-user/${account.id}`}>
                                    {HideEdit()}
                                </Link>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="profile-work">
                                    <p>Khu vực</p>
                                    <a href="">{account.address}</a><br />
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="tab-content profile-tab" id="myTabContent">
                                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label>ID tài khoản</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{account.id}</p>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-3">
                                                <label>Họ</label>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" id="form3Example1" class="form-control"
                                                    name="firstname"
                                                    value={account.firstname}
                                                    onChange={(e) => handleChange(e)}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <br></br>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label>Tên</label>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" id="form3Example1" class="form-control"
                                                    name="lastname"
                                                    value={account.lastname}
                                                    onChange={(e) => handleChange(e)}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <br></br>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" id="form3Example1" class="form-control"
                                                    name="email"
                                                    value={account.email}
                                                    onChange={(e) => handleChange(e)}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <br></br>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label>Điện thoại</label>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" id="form3Example1" class="form-control"
                                                    name="phone"
                                                    value={account.phone}
                                                    onChange={(e) => handleChange(e)}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <br></br>


                                    </div>


                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ViewUser;