import ImageGallery from 'react-image-gallery';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams  } from 'react-router-dom';
import RealEstateService from './Service/RealEstateService';
import Pagination from "@material-ui/lab/Pagination";
import Title from "./Title"
import FilterSearchBar from "./FilterSearchBar";

const SearchResult = () => {

    const [RealEstate, setRealEstate] = useState([])
    const { query } = useParams();
    console.log("TU KHOA ", query)

    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(6);

    const [searchParams, setSearchParams] = useSearchParams();

    const price = searchParams.get("price");
    const floor_space = searchParams.get("floor_space");
    const area = searchParams.get("area");
    const room = searchParams.get("room");

    console.log("price:   ",price)
    console.log("floor_space:   ",floor_space)
    console.log("area:   ",area)
    console.log("room:   ",room)

    const handleFilterParams = (price, floor_space, area, room) => {
        let params = {};
    
        if (!price) {
          params["price"] = null;
        } else {
            params["price"] = price
        }
    
        if (!floor_space) {
          params["floor_space"] = null;
        } else {
            params["floor_space"] = floor_space;
        }

        if (!area) {
            params["area"] = null;
        } else {
            params["area"] = area;
        }

        if (!room) {
            params["room"] = null;
        } else {
            params["room"] = room;
        }
    
        return params;
      };

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


    useEffect(() => {   
        
        if (query == "all") {

            const params = getRequestParams(page, pageSize);            

            RealEstateService.getAllRealEstate(params).then((response) => {
                const { listings, totalPages } = response.data;
                setCount(totalPages);
                setRealEstate(listings);
                console.log(response.data);                
            }).catch(error => {
                console.log(error);
            })
        } else if(query == "searchbyfilter") {

            const params = handleFilterParams(price, floor_space, area, room)
            
            RealEstateService.multipleSearchRealEstates(params).then((response) => {
                setRealEstate(response.data)
                console.log(response.data);
        
            }).catch(error => {
                console.log(error);
            })
        }
        else {
            RealEstateService.searchRealEstate(query).then((response) => {
                setRealEstate(response.data)
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        }

    }, [page, pageSize])

    const title = {
        text: "Kết quả tìm kiếm",
        description: "Từ khóa " + '"' + query + '"'
    }

    const handlePageChange = (event, value) => {
        setPage(value);
      };


    const handlePageSizeChange = (event) => {       
        setPageSize(event.target.value);
        setPage(1);
    };

    return (
        <div className='container'>
            <FilterSearchBar />
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
                <div className="mt-3">
                    
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
            </section>
        </div>
    )
}

export default SearchResult