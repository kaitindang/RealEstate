import axios from "axios";

const PRO_API_BASE_URL = "http://localhost:8093/api/payment";

const config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }
}

class PaymentService {


    getPaymentHistory(id_payment) {
        return axios.get(PRO_API_BASE_URL + "/payment-history/" + id_payment,
            {
                headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
            });
    }

    getPaymentByAccountId(id_account){
        return axios.get(PRO_API_BASE_URL + "/findByAccountId"+"/"+ id_account,
            {
                headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
            });
    }


    
}

export default new PaymentService();