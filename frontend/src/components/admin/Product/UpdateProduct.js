import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from './ProductService';

const UpdateProduct= () => {

    const { id_product } = useParams();
    const [product, setProduct] = useState({

        id_product: "",
        name: "",
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

    const handleChange = (e) => {
        const value = e.target.value;
        setProduct({ ...product, [e.target.name]: value });
    };

    useEffect(() => {
        debugger;
        const fetchData = async () => {
            try {
                const response = await ProductService.getProductById(id_product);
                setProduct(response.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const updateProduct = (e) => {
        e.preventDefault();
        ProductService.updateProduct(id_product, product).then((response) => {
            navigate("/productList");
        }).catch((error) => {
            console.log(error);
        })
    };

    const navigate = useNavigate();

    return (
        <div className='flex max-w-2xl mx-auto shadow border-b'>
            <div className='px-8 py-8'>
                <div className='font-thin text-2xl tracking-wider'>
                    <h1>Update Product </h1>
                </div>

                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className=' block text-gray-800 text-sm font-normal'>Name Product</label>
                    <input
                        type='text'
                        name="name"
                        value={product.name}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 mt-2 px-2 py-2 border'></input>

                </div>

                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className=' block text-gray-800 text-sm font-normal'>Detail Product</label>
                    <input
                        type='text'
                        name="detail_product"
                        value={product.detail_product}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 mt-2 px-2 py-2 border'></input>

                </div>

                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className=' block text-gray-800 text-sm font-normal'>Price</label>
                    <input
                        type='number'
                        name="price"
                        value={product.price}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 mt-2 px-2 py-2 border'></input>

                </div>

                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className=' block text-gray-800 text-sm font-normal'>Quantity</label>
                    <input
                        type='number'
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 mt-2 px-2 py-2 border'></input>

                </div>


                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className=' block text-gray-800 text-sm font-normal'>Id ProductCate</label>
                    <input
                        type='text'
                        name="id_productcate"
                        value={product.id_productcate}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 mt-2 px-2 py-2 border'></input>

                </div>

                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className=' block text-gray-800 text-sm font-normal'>Id Brand</label>
                    <input
                        type='text'
                        name="id_brand"
                        value={product.id_brand}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 mt-2 px-2 py-2 border'></input>

                </div>

                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className=' block text-gray-800 text-sm font-normal'>Date Create</label>
                    <input
                        type='date'
                        name="date_create"
                        value={product.date_create}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 mt-2 px-2 py-2 border'></input>

                </div>

                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className=' block text-gray-800 text-sm font-normal'>Image Product</label>
                    <input
                        type='text'
                        name="image_product"
                        value={product.image_product}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 mt-2 px-2 py-2 border'></input>

                </div>




                <div className='items-center justify-center h-14 w-full my-4 space-x-4'>
                    <button onClick={updateProduct} className='rounded text-white bg-blue-700 w-14 hover:bg-stone-950'>Update</button>
                    <button onClick={() => { navigate("/productList") }} className='rounded text-white bg-red-600 w-14 hover:bg-stone-950'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct;