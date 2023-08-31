import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Pagination from "@material-ui/lab/Pagination";
import ProductService from './ProductService';
import Product from './Product';
import Sidebar from '../../client/Sidebar';
import RealEstateService from '../../client/Service/RealEstateService';
import CashIn from '../../client/CashIn';

const ProductList = (props) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({
        id_product: "",
        name_product: "",
        detail_product: "",
        image_product: "",
        date_create: "",
        id_productcate: "",
        id_brand: "",
        price: "",
        quantity: "",
        person_modified: "",
        date_modified: "",
        enable_product: ""
    });

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const pageSizes = [5, 10];

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
        retrieveUsers();

    }, [page, pageSize])

    const retrieveUsers = () => {
        const fetchData = async () => {
            var role = localStorage.getItem("role");
            var id = localStorage.getItem("id");
            debugger
            console.log(id);

            if (role == "ROLE_USER") {
                const params = getRequestParams(page, pageSize);
                setLoading(true);
                debugger
                try {
                    const response = await RealEstateService.getListingByUser(id, params);
                    debugger
                    const { listings, totalPages } = response.data;
                    
                    setProduct(listings);
                    setCount(totalPages);
    
                }
                catch (error) {
                    console.log(error);
                }
                setLoading(false);
            } else {
                const params = getRequestParams(page, pageSize);
                setLoading(true);
                try {
                    const response = await ProductService.getProduct(params);
                    const { listings, totalPages } = response.data;
    
                    setProduct(listings);
                    setCount(totalPages);
    
                }
                catch (error) {
                    console.log(error);
                }
                setLoading(false);
            }

        };
        fetchData();
    };



    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    const deleteProduct = (e, id) => {
        e.preventDefault();
        RealEstateService.deleteRealEstate(id).then((res) => {
            if (product) {
                setProduct((prevElement) => {
                    return prevElement.filter((product) => product.id_product !== id)
                })
            }
        })
    }

    const hideProduct = (e, id) => {
        e.preventDefault();
        ProductService.enableProduct(id).then((res) => {
            if (product) {
                setProduct((prevElement) => {
                    return prevElement.filter((product) => product.id_product !== id)
                })
            }
        })
    }



    return (
        
        <div className='row'>
            <div class="col-sm-3">
                <Sidebar />
            </div>
            <div class="col-sm-9">

                <div className='flex shadow border-b overflow-x-scroll'>
                    <table class="table table-bordered">
                        <thead >
                            <tr>
                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    #
                                </th>
                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    Bản tin
                                </th>
                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    Giá
                                </th>
                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    Người đăng
                                </th>
                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    Trạng thái
                                </th>
                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">

                                </th>
                            </tr>

                        </thead>
                        {!loading && (
                            <tbody className='bg-white'>

                                {product.map((product) => (
                                    <Product product={product}
                                        deleteProduct={deleteProduct}
                                        hideProduct={hideProduct}
                                        key={product.id_product}>

                                    </Product>

                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
                <div className="col-md-12 list d-flex justify-content-between">
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
                </div>
            </div>
        </div>
        
    )
}

export default ProductList;