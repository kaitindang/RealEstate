import axios from 'axios'

const FINANCE_BASE_REST_API_URL = 'http://localhost:8094/finance';
const config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }
}

class FinanceService{


    calculateBank(finance){
        return axios.post(FINANCE_BASE_REST_API_URL, finance,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

}

export default new FinanceService();