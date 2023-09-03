import axios from 'axios'

const REALESTATE_BASE_REST_API_URL = 'http://localhost:8060/realestates';

class RealEstateService{

    getAllRealEstate(){
        return axios.get(REALESTATE_BASE_REST_API_URL+"/all-list",{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    })}

    createRealEstate(realestates){
        return axios.post(REALESTATE_BASE_REST_API_URL, realestates,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    })
    }

    getRealEstateById(realestatesId){
        return axios.get(REALESTATE_BASE_REST_API_URL + '/' + realestatesId,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    updateRealEstate(realestatesId, realestates){
        return axios.put(REALESTATE_BASE_REST_API_URL + '/' + realestatesId, realestates,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    deleteRealEstate(realestatesId){
        return axios.delete(REALESTATE_BASE_REST_API_URL + '/' + realestatesId,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    searchRealEstate(keyword) {
        return axios.get(REALESTATE_BASE_REST_API_URL + '/search?keyword=' + keyword,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

}

export default new RealEstateService();