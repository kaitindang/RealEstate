import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PaymentService from './ProductService';
import Payment from './Product';
import ProductService from './ProductService';
import Product from './Product';

const ProductList = () => {
    const navigate = useNavigate();

    const [loading,setLoading] = useState(true);
    const [product, setProduct] = useState({
        id_product:"",
        name_product:"",
        detail_product:"",
        image_product:"",
        date_create:"",
        id_productcate:"",
        id_brand:"",
        price:"",
        quantity:"",
        person_modified:"",
        date_modified:"",
        enable_product:""
    });

    useEffect(() =>{
        
        const fetchData = async () =>{
            debugger;
            setLoading(true);
             try{
                const response = await ProductService.getProduct();
                setProduct(response.data);
              } 
              catch(error)
             {
                console.log(error);
             }
             setLoading(false);
        };
        fetchData();
    },[])
    
    const deleteProduct = (e,id) =>{
        e.preventDefault();
        ProductService.deleteProduct(id).then((res)=>{
            if(product){
                setProduct((prevElement)=>{
                    return prevElement.filter((product)=> product.id_product !== id)
                })
            }
        })
    }
    return (
        <div className='container mx-auto my-8'>
            <div className='h-12'>
                <button 
                onClick={() => navigate("/addProduct")}
                className='rounded bg-slate-600 text-white px-6 py-2'>
                    Add Product
                </button>

            </div>

            <div className='flex shadow border-b overflow-x-scroll'>
                <table>
                    <thead >
                        <tr>
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                Id Product
                            </th>
                     
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                Name Product
                            </th>
                        
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                Detail Product
                            </th>
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                Image Product
                            </th>
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                Date Create
                            </th>
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                Id Product Category
                            </th>
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                Id Brand
                            </th>
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                Price
                            </th>
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                quantity
                            </th>
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                person modified
                            </th>
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                date modified
                            </th>
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                enable_product
                            </th>
                            <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                Action
                            </th>
                            
                            
                        </tr>

                    </thead>
                    {!loading && (
                    <tbody className='bg-white'>
                   
                        {product.map((product)=> (
                            <Product product={product}
                            deleteProduct= {deleteProduct}
                            key={product.id_product}>
                            
                            </Product>
                        ))}
                    </tbody>
                    )}
                </table>

            </div>
        </div>

    )
}

export default ProductList;