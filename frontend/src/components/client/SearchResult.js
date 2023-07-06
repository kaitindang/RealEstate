import ImageGallery from 'react-image-gallery';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams  } from 'react-router-dom';
import RealEstateService from './Service/RealEstateService';
import Pagination from "@material-ui/lab/Pagination";
import Title from "./Title"
import FilterSearchBar from "./FilterSearchBar";
import FilterSearchBar1 from "./FilterSearchBar1";

const SearchResult = () => {

    const [RealEstate, setRealEstate] = useState([])
    const { query } = useParams();
    console.log("TU KHOA ", query)

    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(6);

    const [searchParams, setSearchParams] = useSearchParams();

    const price_start = searchParams.get("price_start");
    const price_end = searchParams.get("price_end");
    const area_start = searchParams.get("area_start");
    const area_end = searchParams.get("area_end");
    const room_start = searchParams.get("room_start");
    const room_end = searchParams.get("room_end");
    const floor_spaceStart = searchParams.get("floor_spaceStart");
    const floor_spaceEnd = searchParams.get("floor_spaceEnd");
    const address = searchParams.get("address");
    const listing_categories = searchParams.get("listing_categories");
    const listing_type = searchParams.get("listing_type");


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


    const getRequestfilterParams = (price_start, price_end, room_start, room_end, area_start, area_end, 
        floor_spaceStart, floor_spaceEnd, address, listing_categories, listing_type) => {
        let params = {};
    
        if (price_start && price_end) {
          params["price_start"] = price_start;
          params["price_end"] = price_end;
        } else {
            params["price_start"] = null;
          params["price_end"] = null;
        }

        if (room_start && room_end) {
            params["room_start"] = room_start;
            params["room_end"] = room_end;
        } else {
              params["room_start"] = null;
            params["room_end"] = null;
        }

        if (area_start && area_end) {
            params["area_start"] = area_start;
            params["area_end"] = area_end;
        } else {
              params["area_start"] = null;
            params["area_end"] = null;
        }

        if (floor_spaceStart && floor_spaceEnd) {
            params["floor_spaceStart"] = floor_spaceStart;
            params["floor_spaceEnd"] = floor_spaceEnd;
        } else {
              params["floor_spaceStart"] = null;
            params["floor_spaceEnd"] = null;
        }

        if (address) {
            params["address"] = address;
        } else {
              params["address"] = null;
        }

        if (listing_categories) {
            params["listing_categories"] = listing_categories;
        } else {
              params["listing_categories"] = null;
        }

        if (listing_type) {
            params["listing_type"] = listing_type;
        } else {
              params["listing_type"] = null;
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

            const params = getRequestfilterParams(price_start, price_end, room_start, room_end, area_start, area_end, 
                    floor_spaceStart, floor_spaceEnd, address, listing_categories, listing_type)
            
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