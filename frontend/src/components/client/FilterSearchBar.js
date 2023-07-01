import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import RealEstateService from './Service/RealEstateService';
import { Form, Button } from 'reactstrap';

const FilterSearchBar = () => {

    const navigate = useNavigate();

    const [product, setProduct] = useState({

        price: "",
        area: "",
        floor_space: "",
        room: ""

    })

    const getRequestParams = (page, pageSize) => {
        let params = {};
    
        if (!product.price) {
          params["price"] = null;
        }
    
        if (pageSize) {
          params["size"] = pageSize;
        }
    
        return params;
      };

    const handleChange = (e) => {
        const value = e.target.value;
        setProduct({ ...product, [e.target.name]: value });
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(!product.price) {
            product.price = null
        }

        navigate(`/search/searchbyfilter?price=${product.price}&area=${product.area}&floor_space=${product.floor_space}&room=${product.room}`)
        
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
        <Form onSubmit={submitHandler} inline>
            <section class="search-sec">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Tìm kiếm..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    
                    <div class="input-group-append">
                        <button type="submit" class="btn btn-primary wrn-btn">Tìm kiếm</button>
                        
                    </div>
                </div>
                <div class="container">
                    <form action="#" method="post" novalidate="novalidate">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                        <select class="form-control search-slt" id="exampleFormControlSelect1"
                                            name="price"
                                            value={product.price}
                                            onChange={(e) => handleChange(e)}>
                                            <option>Mức giá</option>
                                            <option>1000</option>
                                            <option>2000</option>
                                            <option>3000</option>
                                        </select>

                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                        <select class="form-control search-slt" id="exampleFormControlSelect1"
                                            name="area"
                                            value={product.area}
                                            onChange={(e) => handleChange(e)}>
                                            <option>Diện tích</option>
                                            <option>30</option>
                                            <option>35</option>
                                            <option>40</option>
                                            <option>45</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                        <select class="form-control search-slt" id="exampleFormControlSelect1"
                                            name="floor_space"
                                            value={product.floor_space}
                                            onChange={(e) => handleChange(e)}>
                                            <option>Số tầng</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                        <select class="form-control search-slt" id="exampleFormControlSelect1"
                                            name="room"
                                            value={product.room}
                                            onChange={(e) => handleChange(e)}>
                                            <option>Số phòng</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Form>
    )
}

export default FilterSearchBar;