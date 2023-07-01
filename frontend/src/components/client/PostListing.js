import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import RealEstateService from './Service/RealEstateService';

const AddProduct = () => {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [floor_space, setFloor_space] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [detail_product, setDetail_product] = useState('')
    const [room, setRoom] = useState('')
    const [area, setArea] = useState('')
    const [owner_project, setOwner_project] = useState('')
    const [priority_type, setPriority_type] = useState('');


    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrUpdateRealEstate = (e) => {
        e.preventDefault();

        const realestates = { name, address, floor_space, price, type, detail_product, room, area, owner_project, priority_type }

        if (id) {
            RealEstateService.updateRealEstate(id, realestates).then((response) => {
                console.log(response.data)
                navigate('/')
            }).catch(error => {
                console.log(error)
            })

        } else {
            RealEstateService.createRealEstate(realestates).then((response) => {

                console.log(response.data)
                navigate('/');

            }).catch(error => {
                console.log(error)
            })
        }

    }

    const handleExpireChange = (e) => {
        setPriority_type(e.target.value);
    };

    useEffect(() => {

        RealEstateService.getRealEstateById(id).then((response) => {
            setName(response.data.name)
            setAddress(response.data.address)
            setFloor_space(response.data.floor_space)
            setPrice(response.data.price)
            setType(response.data.type)
            setDetail_product(response.data.detail_product)
            setRoom(response.data.room)
            setArea(response.data.area)
            setOwner_project(response.data.owner_project)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if (id) {
            return <h2 >Chỉnh sửa tin đăng</h2>
        } else {
            return <h2 >Thông tin cơ bản</h2>
        }
    }

    return (
        <div class="row">

            <div class="col-sm-4">
                <Sidebar />
            </div>

            <form class="col-sm-7">

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/" class="text-decoration-none">Trang chủ</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Đăng tin</li>
                    </ol>
                </nav>


                <h2> {title()} </h2>

                <div class="form-group mb-3">
                    <label for="inputTitle">Tiêu đề</label>
                    <input type="text"
                        class="form-control"
                        id="inputTitle"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tiêu đề">
                    </input>

                </div>
                <div class="form-group mb-3">
                    <label for="inputAddress">Địa chỉ</label>
                    <input type="text"
                        class="form-control"
                        id="inputAddress"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Nhập địa chỉ">
                    </input>
                </div>
                <div class="form-group mb-3">
                    <label for="inputDetail">Mô tả</label>
                    <textarea class="form-control"
                        aria-label="With textarea"
                        id="inputDetail"
                        name="address"
                        value={detail_product}
                        onChange={(e) => setDetail_product(e.target.value)}
                        placeholder="Nhập mô tả">
                    </textarea>

                </div>
                <div class="form-group mb-3">
                    <label for="inputProject">Dự án</label>
                    <input type="text"
                        class="form-control"
                        id="inputProject"
                        name="owner_project"
                        value={owner_project}
                        onChange={(e) => setOwner_project(e.target.value)}
                        placeholder="Nhập tên dự án, VD Vinhomes">
                    </input>
                </div>
                <div class="form-row" style={{ display: 'flex' }}>
                    <div class="form-group col-md-6 mb-3">
                        <label for="inputArea">Diện tích</label>
                        <input type="text"
                            class="form-control"
                            id="inputArea"
                            name="area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            placeholder="Nhập diện tích, VD 80"
                        >
                        </input>
                    </div>
                    <div class="form-group col-md-3 mb-3">
                        <label for="inputArea">Số phòng</label>
                        <input type="text"
                            class="form-control"
                            id="inputRoom"
                            name="room"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            placeholder="Nhập số phòng"
                        >
                        </input>
                    </div>
                    <div class="form-group col-md-3 mb-3">
                        <label for="inputFloor">Số tầng</label>
                        <input type="text"
                            class="form-control"
                            name="foor_space"
                            value={floor_space}
                            onChange={(e) => setFloor_space(e.target.value)}
                            id="inputFloor"
                            placeholder="Nhập số tầng"
                        >
                        </input>
                    </div>
                </div>


                <div class="form-row " style={{ display: 'flex' }}>
                    <div class="form-group col-md-8 mb-3">
                        <label for="inputPrice">Mức giá</label>
                        <input type="text"
                            class="form-control"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            id="inputPrice">
                        </input>
                    </div>
                    <div class="form-group col-md-4 mb-3">
                        <label for="inputState">Đơn vị</label>
                        <select id="inputState" class="form-control">
                            <option selected>USD</option>
                            <option>VND</option>
                        </select>
                    </div>

                </div>
                <p for="inputState">Chọn gói tin đăng</p>
                <div class="form-row d-flex justify-content-between" style={{ display: 'flex' }}>
                    
                    <label>
                        <input
                            type="radio"
                            name="expired"
                            value="1"
                            checked={priority_type === "1"}
                            onChange={handleExpireChange}
                        />
                        Tin thường (10.000 VND/7 ngày)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="expired"
                            value="2"
                            checked={priority_type === "2"}
                            onChange={handleExpireChange}
                        />
                        Tin Vip (20.000 VND/15 ngày)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="expired"
                            value="3"
                            checked={priority_type === "3"}
                            onChange={handleExpireChange}
                        />
                        Tin ưu tiên (30.000VND/15 ngày)<br />
                        Ưu điểm:<br/>
                        - Đánh dấu tin ưu tiên <br />
                        - Hiển thị lên đầu danh sách
                    </label>
                </div>

                <button className="btn btn-success" onClick={(e) => saveOrUpdateRealEstate(e)} >Submit </button>
                <Link to="/" className="btn btn-secondary"> Cancel </Link>

            </form>

        </div>
    )
}

export default AddProduct