import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import RealEstateService from './Service/RealEstateService';
import {DropdownProps, Button, Collapse}  from 'react-bootstrap';

const FilterSearchBar1 = () => {

    const navigate = useNavigate();

    const [product, setProduct] = useState({

        price: "",
        price_start: "",
        price_end: "",
        area: "",
        floor_space: "",
        room: "",
        address: "",
        listing_categories: ""

    })

    const handleChange = (e) => {
        const value = e.target.value;
        setProduct({ ...product, [e.target.name]: value });
    }

    const submitHandler = (e) => {
        e.preventDefault()

        navigate(`/search/searchbyfilter?price_start=${product.price_start}&price_end=${product.price_end}&area=${product.area}&floor_space=${product.floor_space}&room=${product.room}&price_address=${product.address}`)

        window.location.reload();
    }

    const reset = (e) => {
        e.preventDefault();
        setProduct({
            id_product: "",
            name: "",
            detail_product: "",
            image_product: "",
            date_create: "",
            id_productcate: "",
            price: "",
            person_modified: "",
            date_modified: "",
            enable_product: ""
        });
    }

    return (

        <div class="container mt-5">

            <div class="row d-flex justify-content-center">

                <div class="col-md-10">

                    <div class="card p-3  py-4">

                        <h5>An Easier way to find your Housing</h5>

                        <div class="row g-3 mt-2">

                            <div class="col-md-3">

                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown button
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>

                            </div>

                            <div class="col-md-6">

                                <input type="text" class="form-control" placeholder="Enter address e.g. street, city and state or zip" />

                            </div>

                            <div class="col-md-3">

                                <button class="btn btn-secondary btn-block">Search Results</button>

                            </div>

                        </div>


                        <div class="mt-3">
                            
                            <a data-bs-toggle="collapse" data-bs-target="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" class="advanced">
                                Advance Search With Filters <i class="fa fa-angle-down"></i>
                            </a>


                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">

                                    <div class="row">

                                        <div class="col-md-4">

                                            <input type="text" placeholder="Property ID" class="form-control" />

                                        </div>


                                        <div class="col-md-4">

                                            <input type="text" class="form-control" placeholder="Search by MAP" />

                                        </div>


                                        <div class="col-md-4">

                                            <input type="text" class="form-control" placeholder="Search by Country" />

                                        </div>

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

export default FilterSearchBar1;