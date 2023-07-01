import ImageGallery from 'react-image-gallery';
import React, {useState, useEffect} from 'react'
import {Link, useNavigate , useParams } from 'react-router-dom';
import RealEstateService from './Service/RealEstateService';


const FlatDetail = () => {
    const images = [
        {
            original: '/img/product1.jpeg',
            thumbnail: '/img/product1.jpeg',
        },
        {
            original: '/img/banner.jpg',
            thumbnail: '/img/banner.jpg',
        },
        {
            original: '/img/product1.jpeg',
            thumbnail: '/img/product1.jpeg',
        },
    ];

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [floor_space, setFloor_space] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [detail_product, setDetail_product] = useState('')
    const [room, setRoom] = useState('')
    const [area, setArea] = useState('')
    const [owner_project, setOwner_project] = useState('')
    const history = useNavigate();
    const {id} = useParams();

    useEffect(() => {

        RealEstateService.getRealEstateById(id).then((response) =>{
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
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="flat-detail">
            
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="fd-top flat-detail-content">
                            
                            <div>
                                <h3 className="flat-detail-title">{name}</h3>
                                <p className="fd-address"> <i className="fas fa-map-marker-alt"></i>
                                {address}</p>
                            </div>
                            <div>
                                <span className="fd-price">${price}</span>
                            </div>
                        </div>
                        <ImageGallery flickThreshold={0.50} slideDuration={0} items={images} showNav={false} showFullscreenButton={false} showPlayButton={false} />
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
                                    <h4>Maps</h4>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15105200.564429!2d37.91245092855647!3d38.99130948591772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b0155c964f2671%3A0x40d9dbd42a625f2a!2zVMO8cmtpeWU!5e0!3m2!1str!2str!4v1630158674074!5m2!1str!2str" width="100%" height="450" loading="lazy"></iframe>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="fd-sidebar-item">
                                    <h4>Được đăng bởi</h4>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span></span>
                                    </div>
                                    
                                </div>
                                <div className="fd-sidebar-item">
                                    <h4>Danh sách khác</h4>
                                    <ul className="category-ul">
                                        <li>Category 1</li>
                                        <li>Category 2</li>
                                        <li>Category 3</li>
                                        <li>Category 4</li>
                                        <li>Category 5</li>
                                    </ul>
                                </div>
                                <div className="fd-sidebar-item">
                                    <h4>Dành cho bạn</h4>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Bất động sản 1</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Bất động sản 2</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Bất động sản 3</span>
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