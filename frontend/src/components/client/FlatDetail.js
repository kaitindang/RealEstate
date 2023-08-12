import ImageGallery from 'react-image-gallery';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import RealEstateService from './Service/RealEstateService';
import UserService from '../admin/Product/UserService';
import ImagesListing from './ImagesListing';
import Finance from './Finance';

const FlatDetail = () => {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [floor_space, setFloor_space] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [detail_product, setDetail_product] = useState('')
    const [room, setRoom] = useState('')
    const [area, setArea] = useState('')
    const [owner_project, setOwner_project] = useState('')
    const [date_create, setDate_create] = useState('')
    const [date_expired, setDate_expired] = useState('')
    const history = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const [recommendListingAddress, setRecommendListingAddress] = useState([]);
    const [recommendUserAddress, setRecommendUserAddress] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const addressParam = searchParams.get("address");
    const person_modified = searchParams.get("person_modified");

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

    useEffect(() => {

        RealEstateService.getRealEstateById(id).then((response) => {
            console.log(response.data)
            setName(response.data.name)
            setAddress(response.data.address)
            setFloor_space(response.data.floor_space)
            setPrice(response.data.price)
            setType(response.data.type)
            setDetail_product(response.data.detail_product)
            setArea(response.data.area)
            setRoom(response.data.room)
            setOwner_project(response.data.owner_project)
            setDate_create(response.data.date_create)
            setDate_expired(response.data.date_expired)
            debugger

        }).catch(error => {
            console.log(error)
        })

        UserService.getUserById(person_modified).then((response) => {
            console.log(response.data)

            setAccount(response.data)
        }).catch(error => {
            console.log(error)
        })

        recommendAddress();
    }, [])

    const recommendAddress = () => {

        RealEstateService.recommendListingAddress(id, addressParam).then((response) => {
            console.log(response.data)
            debugger
            setRecommendListingAddress(response.data)

        }).catch(error => {
            console.log(error)
        })

        UserService.recommendUserAddress(id, addressParam).then((response) => {
            console.log(response.data)
            debugger
            setRecommendUserAddress(response.data)

        }).catch(error => {
            console.log(error)
        })

    }

    const handleReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 100);

    };

    return (
        <div className="flat-detail">

            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="fd-top flat-detail-content">

                            <div className="col-lg-8">
                                <h3 className="flat-detail-title">{name}</h3>
                                <p className="fd-address"> <i className="fas fa-map-marker-alt"></i>
                                    {address}</p>
                            </div>
                            <div>
                                <span className="fd-price">{price.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")} VND</span>
                            </div>
                        </div>
                        <div className="row">
                            <ImagesListing />
                            <div className="col-lg-4">
                                <div className="fd-sidebar-item">
                                    <h4 style={{ textAlign: "center" }}>Được đăng bởi</h4>
                                    <div className="recently-item">
                                        <Link className="d-flex align-items-start flex-column bd-highlight text-decoration-none align-items-center justify-content-center" to={`/view-user/${account.id}`}>

                                            <img src={account.avatar} alt="detail" style={{ width: "100px", height: "100px" }} />
                                            <div className="d-flex align-items-start flex-column bd-highlight align-items-center justify-content-center">
                                                <span><b>{account.username}</b></span>

                                                <span></span>
                                            </div>

                                        </Link>
                                    </div>
                                    <br></br>

                                    <div class="d-flex align-items-start flex-column bd-highlight">
                                        <button type="button" class="btn btn-outline-dark p-3 mb-2" style={{ width: "350px" }} ><i class="fas fa-envelope"></i> {account.email}</button>
                                        <button type="button" class="btn btn-outline-dark p-3" style={{ width: "350px" }}><i class="fas fa-phone"></i> 0{account.phone}</button>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-8">                              
                                <div className="fd-item">
                                    <h4>Mô tả</h4>
                                    <p>{detail_product}</p>
                                </div>
                                <div className="fd-item fd-property-detail">
                                    <h4>Đặc điểm bất động sản</h4>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <span>Diện tích</span><br></br>
                                            <span>{area} m²</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Số tầng</span><br></br>
                                            <span>{floor_space} tầng</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Số phòng</span><br></br>
                                            <span>{room} phòng</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="fd-item fd-features">
                                    <h4>Dự án </h4>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <i className="fa fa-check"></i>
                                            <span>{owner_project}</span>
                                        </div>
                                    </div>

                                </div>

                                <div className="fd-item">
                                    <h4>Bản đồ</h4>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15105200.564429!2d37.91245092855647!3d38.99130948591772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b0155c964f2671%3A0x40d9dbd42a625f2a!2zVMO8cmtpeWU!5e0!3m2!1str!2str!4v1630158674074!5m2!1str!2str" width="100%" height="450" loading="lazy"></iframe>
                                </div>

                                <div className="fd-item fd-features">
                                    <h4>Vay mua nhà</h4>
                                    <div className="row">
                                        <Finance />
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4">


                                <div className="fd-sidebar-item">
                                    <h4>BĐS cùng khu vực <br></br> {addressParam}</h4><br></br>
                                    <div className="recommend-listing">
                                        {
                                            recommendListingAddress.map((listing, index) =>
                                                <div className="recently-item pb-5 ">

                                                    <Link onClick={handleReload} className="d-flex align-items-start flex-column bd-highlight mb-3 text-decoration-none" to={`/detail-realestate/${listing.id_product}?address=${listing.address}`}>
                                                        <div className="d-flex justify-content-between">
                                                            <img src={listing.image_product} alt="detail" width="50px" />
                                                            <div className="d-flex align-items-start flex-column bd-highlight mb-3">
                                                                <span>{listing.name}</span>

                                                                <span className="fd-address"> <i className="fas fa-map-marker-alt"></i>
                                                                    {listing.address}</span>
                                                            </div>
                                                        </div>

                                                    </Link>
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className="fd-sidebar-item">
                                    <h4>Môi giới trong khu vực <br></br> {addressParam}</h4><br></br>
                                    <div className="recommend-listing">
                                        {
                                            recommendUserAddress.map((user, index) =>
                                                <div className="recently-item pb-5 ">

                                                    <Link className="d-flex align-items-start flex-column bd-highlight mb-3 text-decoration-none" to={`/view-user/${account.id}`}>
                                                        <div className="d-flex justify-content-between">
                                                            <img src={user.avatar} alt="detail" width="50px" />
                                                            <div className="d-flex align-items-start flex-column bd-highlight mb-3">
                                                                <span><b>{user.username}</b></span>
                                                                <span><i class="fas fa-phone"></i> 0{user.phone}</span>
                                                                <span className="fd-address"> <i className="fas fa-map-marker-alt"></i>
                                                                    {user.address}</span>
                                                            </div>
                                                        </div>

                                                    </Link>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlatDetail