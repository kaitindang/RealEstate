import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductService from './ProductService';
import ProductWaiting from './ProductWaiting';
import Sidebar from '../../client/Sidebar';
import RealEstateService from '../../../services/RealEstateService';

const ProductList = () => {
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

    useEffect(() => {

        const fetchData = async () => {
            debugger;
            setLoading(true);
            try {
                const response = await ProductService.getProductWaiting();
                setProduct(response.data);
            }
            catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [])

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
        ProductService.approveProduct(id).then((res) => {
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
                    <table class="table table-sm">
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
                                    Trạng thái
                                </th>
                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">

                                </th>
                            </tr>

                        </thead>
                        {!loading && (
                            <tbody className='bg-white'>

                                {product.map((product) => (
                                    <ProductWaiting product={product}
                                        deleteProduct={deleteProduct}
                                        hideProduct={hideProduct}
                                        key={product.id_product}>

                                    </ProductWaiting>

                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ProductList;