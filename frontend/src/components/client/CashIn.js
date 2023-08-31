import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import PaymentService from "../../services/PaymentService";
const CashIn = () =>{
    const navigate = useNavigate();
    const [amount,setAmount] = useState(0);
    const name_payment = "Nạp tiền"
    const id_account = localStorage.getItem("id")
    
    const save = () => {
        const payment = {
           name_payment, id_account,amount
        }

        PaymentService.cashIn(payment).then((response) =>{
            console.log(response);
            navigate("/")
        })
    }
    
    
    return(
        <div className='row'>
            <div class="col-sm-3">
                <Sidebar />
            </div>
            <div class="col-sm-9">

                <div className="mx-auto w-3 col-sm-2 row-start-4 " >
                    <input onChange={(e) => setAmount(e.target.value)} className="my-3" placeholder="Nhập số tiền cần nạp"></input>
                    <button onClick={() => save()} className="btn btn-info mx-2">Submit</button>
                    <button onClick={()=> navigate("/")} className="btn btn-danger">Cancel</button>
                </div>
               
            </div>
        </div>
    )
}

export default CashIn;