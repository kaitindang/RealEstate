import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductService from './ProductService';


const User = ({ account, deleteAccount }) => {


  const navigate = useNavigate();
  


  return (

    <tr key={account.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">{account.id}</td>
         
      <Link className="item-title" to={`/userView/${account.id}`}>       
        <td className="text-left px-6 py-4 whitespace-nowrap">{account.username}</td>
      </Link>

      <td className="text-left px-6 py-4 whitespace-nowrap">{account.email}</td>

      <td className="text-left px-6 py-4 whitespace-nowrap"></td>
      <td className="text-left px-6 py-4 whitespace-nowrap text-sm">


        <button className="btn btn-danger" onClick={(e, id) => deleteAccount(e, account.id)}>
          Xóa
        </button>
      </td>

    </tr>
  )
}

export default User;