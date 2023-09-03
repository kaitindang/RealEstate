import axios from 'axios'

const AUTH_BASE_REST_API_URL = 'http://localhost:8060/api/auth';

class Account{

    signUp(infor){
        return axios.post(AUTH_BASE_REST_API_URL + "/signup", infor
    );
    }

}

export default new Account();