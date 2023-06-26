import Title from "./Title"
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RealEstateService from '../../services/RealEstateService';
import ProductService from '../admin/Product/ProductService';

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

        console.log(params.size)

        ProductService.getProduct(1,3).then((response) => {
            const { products, totalPages } = response.data;
            setCount(totalPages);
            setRealEstate(products);
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

                    {
                        RealEstate.map(

                            RealEstate =>

                                <div className="text-center col-lg-4 col-12 col-md-6 ">
                                    <div className="item">
                                        <div className="item-image">
                                            <img className="img-fluid" src="/img/product1.jpeg" alt="flat" />
                                        </div>
                                        <div className="item-description">
                                            <div className="d-flex justify-content-between mb-3">
                                                <Link className="item-title" to={`/detail-realestate/${RealEstate.id_product}`}>
                                                    <span className="item-title">{RealEstate.name}</span>
                                                </Link>
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
                                            <div class="card-footer">
                                                <small class="text-muted">{dayjs(RealEstate.date_modified).fromNow()}</small>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                        )
                    }
                </div>
                <div className="mt-3">
                    {"Items per Page: "}
                    <select onChange={handlePageSizeChange} value={pageSize}>
                        {pageSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                   
                </div>
            </div>

        </section>
    )

}

export default FlatList;