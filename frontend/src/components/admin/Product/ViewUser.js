import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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

    const [upload, setUpload] = useState({
        file: null,
        fileUploaded: null,
    });

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');

    const { id } = useParams();

    const handleChange = (e) => {
        const value = e.target.value;
        setAccount({ ...account, [e.target.name]: value });
    }


    const onFileChange = (event) => {
        setUpload({ ...upload, file: event.target.files[0] });
    };


    const navigate = useNavigate();

    const UpdateUser = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('file', upload.file);

        UserService.uploadAvatar(id, formData).then((response) => {

            console.log(response.data);
            setUpload({ ...upload, fileUploaded: true });

        }).catch(error => {
            console.log(error);
        });

        if (id) {
            UserService.updateUser(id, account).then((response) => {
                console.log(response.data)
                navigate(`/userView/${response.data.id}`)
            }).catch(error => {
                console.log(error)
            })

        }

        window.location.reload();
    }


    const changePassword = (e) => {
        e.preventDefault();

        const password = {
            id, oldPassword, newPassword
        }

        if (id) {
            UserService.changePassword(password).then((response) => {
                console.log(response.data)

                alert("Mời bạn đăng nhập lại!");

                localStorage.removeItem("accessToken");
                localStorage.removeItem("id");
                localStorage.removeItem("role");

                navigate("/login")
            }).catch(error => {
                console.log(error)
            })

        }

    }


    useEffect(() => {

        UserService.getUserById(id).then((response) => {
            console.log(response.data)
            setAccount(response.data)
        }).catch(error => {
            console.log(error)
        })

    }, [])

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
                                    <div class="file btn btn-lg btn-primary">
                                        Change photo
                                        <input type="file" name="file" onChange={onFileChange} />
                                    </div>
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
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Đổi mật khẩu</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="profile-work">
                                    <p>Khu vực</p>
                                    <a href="">Quận 1</a><br />
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
                                                />
                                            </div>
                                        </div>
                                        <br></br>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label>Ngày sinh</label>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" id="form3Example1" class="form-control"
                                                    name="dateOfBirth"
                                                    value={account.dateOfBirth}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <br></br>
                                        <button onClick={UpdateUser} type="submit" className="btn btn-primary btn-block mb-4">
                                            Xác nhận
                                        </button>
                                    </div>

                                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label>Mật khẩu cũ</label>
                                            </div>

                                            <div class="col-md-6">
                                                <input type="password" id="form3Example1" class="form-control"
                                                    name="oldPassword"
                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                />

                                            </div>
                                        </div>
                                        <br></br>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label>Mật khẩu mới</label>
                                            </div>

                                            <div class="col-md-6">
                                                <input type="password" id="form3Example1" class="form-control"
                                                    name="newPassword"
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                />

                                            </div>
                                        </div>
                                        <br></br>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label>Nhập lại mật khẩu mới</label>
                                            </div>

                                            <div class="col-md-6">
                                                <input type="password" id="form3Example1" class="form-control"
                                                    name="firstname"
                                                />


                                            </div>

                                        </div>
                                        <br></br>
                                        <button onClick={changePassword} type="submit" className="btn btn-primary btn-block mb-4">
                                            Xác nhận
                                        </button>

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