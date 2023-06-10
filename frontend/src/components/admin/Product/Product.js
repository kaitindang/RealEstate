import React from 'react'
import { useNavigate } from 'react-router-dom';
import ProductService from './ProductService';

const Product = ({ product, deleteProduct, hideProduct }) => {


  const navigate = useNavigate();
  const editProduct = (e, id_product) => {
    e.preventDefault();
    navigate(`/edit-realestate/${id_product}`);
  } 

  

  const hide = () => {
    var enable_product = String(product.enable_product);
    console.log(enable_product);
    if (enable_product == "true") {
      return <p></p>
    }
    else {
      return <p>Đã ẩn</p>
    }
    
  }

  const btnHide = () => {
    var enable_product = String(product.enable_product);
    console.log(enable_product);
    if (enable_product == "true") {
      return <span>Ẩn</span>
    }
    else {
      return <span>Bỏ ẩn</span>
    }
    
  }
 

  return (

    <tr key={product.id_product}>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.id_product}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.name}</td>

      <td className="text-left px-6 py-4 whitespace-nowrap">{product.price}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap">{hide()}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap text-sm">

        <button className="btn btn-warning" onClick={(e, id_product) => editProduct(e, product.id_product)}>
          Sửa
        </button>
        <button className="btn btn-danger" onClick={(e, id_product) => deleteProduct(e, product.id_product)}>
          Xóa
        </button>
        <button className="btn btn-secondary" onClick={(e, id_product) => hideProduct(e, product.id_product)}>
        {btnHide()}
        </button>
      </td>

    </tr>
  )
}

export default Product;