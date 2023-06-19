import axios from 'axios'

const REALESTATE_BASE_REST_API_URL = 'http://localhost:8091/realestates';

class RealEstateService{

    getAllRealEstate(){
        return axios.get(REALESTATE_BASE_REST_API_URL+"/all-list",{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    })
    }

    createRealEstate(realestates){
        return axios.post(REALESTATE_BASE_REST_API_URL, realestates)
    }

    getRealEstateById(realestatesId){
        return axios.get(REALESTATE_BASE_REST_API_URL + '/' + realestatesId);
    }

    updateRealEstate(realestatesId, realestates){
        return axios.put(REALESTATE_BASE_REST_API_URL + '/' + realestatesId, realestates);
    }

    deleteRealEstate(realestatesId){
        return axios.delete(REALESTATE_BASE_REST_API_URL + '/' + realestatesId);
    }

}

export default new RealEstateService();