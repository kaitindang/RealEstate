import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductService from './ProductService';


const ProductWaiting = ({ product, deleteProduct, approveProduct }) => {


  const navigate = useNavigate();
  const editProduct = (e, id_product) => {
    e.preventDefault();
    navigate(`/edit-realestate/${id_product}`);
  }


  const status = () => {
    var approve_product = String(product.approve);
    console.log(approve_product);
    if (approve_product === "false") {
      return <span class="badge rounded-pill bg-secondary">Đang chờ</span>
    }
  }


  return (

    <tr key={product.id_product}>
      <td className="text-left px-6 py-4 whitespace-nowrap">{product.id_product}</td>

      <Link className="item-title" to={`/detail-realestate/${product.id_product}`}>
        <td className="text-left px-6 py-4 whitespace-nowrap">{product.name}</td>
      </Link>

      <td className="text-left px-6 py-4 whitespace-nowrap">{product.price}</td>

      <td className="text-left px-6 py-4 whitespace-nowrap">{status()}</td>
      <td className="text-left px-6 py-4 whitespace-nowrap text-sm">

        <button className="btn btn-success" onClick={(e, id_product) => approveProduct(e, product.id_product)}>
          Duyệt
        </button>
        <button className="btn btn-danger" onClick={(e, id_product) => deleteProduct(e, product.id_product)}>
          Xóa
        </button>
      </td>

    </tr>
  )
}

export default ProductWaiting;