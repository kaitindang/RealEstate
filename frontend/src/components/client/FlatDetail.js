import ImageGallery from 'react-image-gallery';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import RealEstateService from './Service/RealEstateService';
import ImagesListing from './ImagesListing';
import Finance from './Finance';
import {GoogleMap,LoadScript,Marker,MarkerF} from '@react-google-maps/api'
import { getGeocode,getLatLng } from 'use-places-autocomplete';
import { Fragment } from 'react';
import Geocode from "react-geocode"


const FlatDetail = () => {
    const google = window.google
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
    const { id } = useParams();

    const [recommendListingAddress, setRecommendListingAddress] = useState([]);
        
   const [laglng,setLaglng] = useState(
    {
        lat:null,
        lng:null
    }
    
   )
   const [ismapReady,setIsmapReady] = useState(false)
    const recommendAddress = () => {
        const realestates = {
            address
        }
        RealEstateService.recommendListingAddress(realestates).then((response) => {
            console.log(response.data)
            debugger
            setRecommendListingAddress(response.data)

        }).catch(error => {
            console.log(error)
        })

    }
    
   

    useEffect(() => {
        let address1 =''
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
            address1 = response.data.address
          
        }).catch(error => {
            console.log(error)
        })

        const realestates = {
            address
        }
        
        RealEstateService.recommendListingAddress(realestates).then((response) => {
            console.log(response.data)
        
            setRecommendListingAddress(response.data)

        }).catch(error => {
            console.log(error)
        })
        
        
    
    }, [])

    

    const handleReload = () => {
        window.location.reload();
    };
   
  

    
    const containerStyle = {
        width: '500px',
        height: '500px',
      };

    
    function Place() {
        if(laglng.lat == null && laglng.lng == null){
            Geocode.setLanguage('vi')
            Geocode.setRegion('VN')
            Geocode.setApiKey("AIzaSyAbjJPkxU0zTQXY17w3sZBWksp96V1MrNI")
            Geocode.fromAddress(address).then(
            (response) => {
        
              const { lat, lng } = response.results[0].geometry.location;

              setLaglng(response.results[0].geometry.location);            
            },
            (error) => {
              console.error(error);
            }
        )
        }
        
         const [map,setMap] = useState(null)
         const mapref = React.useRef()
         const onload = React.useCallback(function callback(map) {
            mapref.current = map;
            setMap(map)

         },[])

        


        return (
            <Fragment>
                
                    <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={laglng}
                    zoom={10}
                    onLoad={onload}
                  
                    >
                    <MarkerF position={laglng}></MarkerF>
                    </GoogleMap>
                
            </Fragment>
        ) 
       
    }
    

    
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
                                    <h4>Được đăng bởi</h4>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span></span>

                                    </div>
                                    <div class="d-flex align-content-between justify-content-between">

                                        <button type="button" class="btn btn-outline-dark">Yêu cầu liên hệ lại</button>
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

                                <div >
                                    <h4>Bản đồ</h4>
                                    <Place/>
                                   
                                    
                                    
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
                                    <h4>BĐS đề xuất</h4><br></br>
                                    <div className="recommend-listing">
                                        {
                                            recommendListingAddress.map((listing, index) =>
                                                <div className="recently-item pb-5 ">

                                                    <Link onClick={handleReload} className="d-flex align-items-start flex-column bd-highlight mb-3 text-decoration-none" to={`/detail-realestate/${listing.id_product}`}>
                                                        <div className="d-flex justify-content-between">
                                                            <img src="/img/product1.jpeg" alt="detail" width="50px" />
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default FlatDetail