import axios from 'axios'

const REALESTATE_BASE_REST_API_URL = 'http://localhost:8091/realestates';

class RealEstateService{

    getAllRealEstate(){
        return axios.get(REALESTATE_BASE_REST_API_URL+"/all-list")
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

    searchRealEstate(keyword) {
        return axios.get(REALESTATE_BASE_REST_API_URL + '/search?keyword=' + keyword);
    }

}

export default new RealEstateService();