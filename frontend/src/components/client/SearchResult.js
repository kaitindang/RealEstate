import ImageGallery from 'react-image-gallery';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import RealEstateService from '../../services/RealEstateService';
import Title from "./Title"

const SearchResult = () => {

    const [RealEstate, setRealEstate] = useState([])
    const { query } = useParams();

    useEffect(() => {

        RealEstateService.searchRealEstate(query).then((response) => {
            setRealEstate(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const title = {
        text: "Kết quả tìm kiếm",
        description: "Từ khóa " + '"' + query + '"'
    }

    return (
        <section className="section-all-re">
            <div className="container">
            <Title title={title.text} description={title.description} />
                <div className="row">

                    {RealEstate.length === 0 ? (<p>Không có kết quả tìm kiếm</p>) :
                    
                        RealEstate.map(

                            RealEstate =>

                                <div className="text-center col-lg-4 col-12 col-md-6 ">
                                    <div className="item">
                                        <div className="item-image">
                                            <img className="img-fluid" src="/img/product1.jpeg" alt="flat" />
                                        </div>
                                        <div className="item-description">
                                            <div className="d-flex justify-content-between mb-3">
                                                <span className="item-title">{RealEstate.name}</span>
                                                <span className="item-price">${RealEstate.price}</span>
                                            </div>
                                            <div className="item-icon d-flex alig-items-center justify-content-between">
                                                <div>
                                                    <i className="fas fa-check-circle"></i> <span>{RealEstate.floor_space} tầng</span>
                                                </div>
                                                <div>
                                                    <i className="fas fa-check-circle"></i> <span>{RealEstate.room} phòng</span>
                                                </div>
                                                <Link className="item-title" to={`/detail-realestate/${RealEstate.id_product}`}>
                                                    <button className="btn btn-detail">View</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default SearchResult