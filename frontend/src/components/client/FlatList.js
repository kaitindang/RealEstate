import Title from "./Title"
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RealEstateService from './Service/RealEstateService';
import ProductService from '../admin/Product/ProductService';

import Pagination from "@material-ui/lab/Pagination";

import dayjs from "dayjs";

const FlatList = (props) => {

    const [RealEstate, setRealEstate] = useState([])
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const pageSizes = [3, 6, 9];

    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)


    const getRequestParams = (page, pageSize) => {
        let params = {};

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    const getAllRealEstate = () => {
        const params = getRequestParams(page, pageSize);

        RealEstateService.getAllRealEstate(params).then((response) => {
            const { listings, totalPages } = response.data;
            setCount(totalPages);
            setRealEstate(listings);
            debugger
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(getAllRealEstate, [page, pageSize]);

    const title = {
        text: "Danh sách bất động sản",
        description: "Mua bán nhà đất trên toàn quốc"
    }

    const handlePageChange = (event, value) => {
        setPage(value);
    };


    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    return (

        <section className="section-all-re">

            <div className="container">
                <Title title={title.text} description={title.description} />
                <div className="row">

                    <div className="mt-3 d-flex flex-row-reverse bd-highlight">

                        <Pagination
                            color="primary"
                            className="my-3"
                            count={count}
                            page={page}
                            siblingCount={1}
                            boundaryCount={1}
                            variant="outlined"
                            onChange={handlePageChange}
                        />
                    </div>
                    {
                        RealEstate.map(

                            RealEstate =>
                                RealEstate.priority == true ?
                                    <div class="text-center col-lg-4 col-12 col-md-6">

                                        <div class="card h-100 card-image">
                                            <div className="best-estate-img-area">
                                                <img className="best-estate-img" src={RealEstate.image_product} class="card-img-top" alt="..." />
                                                <div className="best-estate-state bg-red">Ưu tiên</div>
                                            </div>


                                            <div class="card-body d-flex align-content-between justify-content-between flex-wrap">

                                                <div className="d-flex align-items-center justify-content-between">
                                                    <Link className="item-title" to={`/detail-realestate/${RealEstate.id_product}`}>
                                                        <span className="item-title">{RealEstate.name}</span>
                                                    </Link>
                                                    <span className="item-price">{RealEstate.price} Tỷ</span>

                                                </div>
                                                <div>
                                                    <p className="fd-address"> <i className="fas fa-map-marker-alt"></i>
                                                        {RealEstate.address}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <div class="mr-auto p-2">
                                                        <i className="fas fa-check-circle"></i> <span>{RealEstate.floor_space} tầng</span>
                                                    </div>
                                                    <div class="p-2">
                                                        <i className="fas fa-check-circle"></i> <span>{RealEstate.room} phòng</span>
                                                    </div>
                                                    <div class="p-2">
                                                        <i className="fas fa-check-circle"></i> <span>{RealEstate.area} m²</span>
                                                    </div>
                                                    <Link className="item-title" to={`/detail-realestate/${RealEstate.id_product}`}>
                                                        <button className="btn btn-detail">Chi tiết</button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="card-footer">
                                                <small class="text-muted">{dayjs(RealEstate.date_modified).fromNow()}</small>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div class="text-center col-lg-4 col-12 col-md-6">

                                        <div class="card h-100 card-image">
                                            <div className="best-estate-img-area">
                                                <img className="best-estate-img" src={RealEstate.image_product} class="card-img-top" alt="..." />                                             
                                            </div>


                                            <div class="card-body d-flex align-content-between justify-content-between flex-wrap">

                                                <div className="d-flex align-items-center justify-content-between">
                                                    <Link className="item-title" to={`/detail-realestate/${RealEstate.id_product}`}>
                                                        <span className="item-title">{RealEstate.name}</span>
                                                    </Link>
                                                    <span className="item-price">{RealEstate.price} Tỷ</span>

                                                </div>
                                                <div>
                                                    <p className="fd-address"> <i className="fas fa-map-marker-alt"></i>
                                                        {RealEstate.address}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <div class="mr-auto p-2">
                                                        <i className="fas fa-check-circle"></i> <span>{RealEstate.floor_space} tầng</span>
                                                    </div>
                                                    <div class="p-2">
                                                        <i className="fas fa-check-circle"></i> <span>{RealEstate.room} phòng</span>
                                                    </div>
                                                    <div class="p-2">
                                                        <i className="fas fa-check-circle"></i> <span>{RealEstate.area} m²</span>
                                                    </div>
                                                    <Link className="item-title" to={`/detail-realestate/${RealEstate.id_product}`}>
                                                        <button className="btn btn-detail">Chi tiết</button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="card-footer">
                                                <small class="text-muted">{dayjs(RealEstate.date_modified).fromNow()}</small>
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

export default FlatList;