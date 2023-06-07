import React from 'react'
import { useNavigate } from 'react-router-dom';

const Product = ({ product, deleteProduct}) => {


  const navigate = useNavigate();
  const editProduct = (e, id_product) => {
    e.preventDefault();
    navigate(`/editProduct/${id_product}`);
  }
  var enable_product = String(product.enable_product);

  return (
   
    <tr key={product.id_product}>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.id_product}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.name}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.detail_product}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.image_product}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.date_create}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.id_productcate}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.id_brand}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.price}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.quantity}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.person_modified}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.date_modified}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{enable_product}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap text-sm">
        <a onClick={(e, id_product) => editProduct(e, product.id_product)} className="px-3 bg-blue-600 hover:bg-blue-900 rounded-md mx-2">Edit</a>
        <a onClick={(e, id_product) => deleteProduct(e, product.id_product)}
          className="px-3 bg-pink-500 hover:bg-red-700 rounded-md">Delete</a>
      </td>
      
    </tr>
  )
}

export default Product;