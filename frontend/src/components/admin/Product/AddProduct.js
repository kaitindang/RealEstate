import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from './ProductService';

const AddProduct = () => {
  const [product, setProduct] = useState({
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

  })

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  }



  const saveProduct = async (e) => {
    e.preventDefault();
    debugger;
    await ProductService.saveProduct(product)
      .then((response) => {
        navigate("/productList")


      }).catch((error) => {

        console.log(error);
        alert(error.response.data.message);
      })

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

  const navigate = useNavigate();

  return (
    <div className='flex max-w-2xl mx-auto shadow border-b'>
      <div className='px-8 py-8'>
        <div className='font-thin text-2xl tracking-wider'>
          <h1>Add new Product</h1>
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
          <label className=' block text-gray-800 text-sm font-normal'>Id ProductCate</label>
          <input
            type='text'
            name="id_productcate"
            value={product.id_productcate}
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




        <div className='items-center justify-center h-14 w-full my-2 space-x-4 flex'>
          <button onClick={saveProduct} className='rounded text-white bg-blue-700 w-10 hover:bg-stone-950'>Save</button>
          <button onClick={reset} className='rounded text-white bg-red-600 w-10 hover:bg-stone-950'>Clear</button>
        </div>
      </div>
    </div>
  )
}

export default AddProduct;