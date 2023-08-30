import React from 'react'


const PaymentHistory = ({ payment }) => {



  return (

    <tr key={payment.id_paymenthistory}>
      <td className="text-left px-6 py-4 whitespace-nowrap">{payment.id_paymenthistory}</td>

      <td className="text-left px-6 py-4 whitespace-nowrap">{payment.pre_amount}</td>

      <td className="text-left px-6 py-4 whitespace-nowrap">{payment.pay_money}</td>
     
      <td className="text-left px-6 py-4 whitespace-nowrap">{payment.aft_amount}</td>

      <td className="text-left px-6 py-4 whitespace-nowrap">{payment.date_modified}</td>
    </tr>
  )
}

export default PaymentHistory;