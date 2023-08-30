import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from './ProductService';
import ProductWaiting from './ProductWaiting';
import Sidebar from '../../client/Sidebar';
import RealEstateService from '../../client/Service/RealEstateService';
import PaymentService from './PaymentService';
import UserService from './UserService';
import PaymentHistory from './PaymentHistory';

const PaymentListing= () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [payment, setPayment] = useState({
        id_payment:"",
        id_paymenthistory:"",
        pre_amount:"",
        aft_amount:"",
        pay_money:"",
        date_modified:""
    });
    const {id_account} = useParams();
    
    useEffect(() => {

        const fetchData = async () => {
            debugger;
            setLoading(true);
            try {
                const response = await PaymentService.getPaymentByAccountId(id_account);
                const response1 = await PaymentService.getPaymentHistory(response.data.id_payment);
                setPayment(response1.data)
                
                
                console.log(response)
                console.log(response1)
               
            }
            catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [])

 





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
                                    Trước thanh toán
                                </th>

                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    Số tiền thanh toán
                                </th>
                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    Sau thanh toán
                                </th>

                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    Ngày thanh toán
                                </th>
                                
                            </tr>

                        </thead>
                        {!loading && (
                            <tbody className='bg-white'>
                                
                                { payment.id_payment !== "" ?
                                payment.map((payment) => (
                                    
                                    <PaymentHistory payment={payment}   
                                        key={payment.id_paymenthistory}>
                                    </PaymentHistory>
                                    
                                ))
                                : null
                                }
                                
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>

    )
}

export default PaymentListing;