import axios from 'axios'

const REALESTATE_BASE_REST_API_URL = 'http://localhost:8091/realestates';
const config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }
}

class RealEstateService{

    getAllRealEstate(params){
        return axios.get(REALESTATE_BASE_REST_API_URL+"/all-listings",
            {
                params: params,
                headers: config.headers
            }
        )
    }

    createRealEstate(realestates){
        return axios.post(REALESTATE_BASE_REST_API_URL + '/create-listing', realestates,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    getRealEstateById(realestatesId){
        return axios.get(REALESTATE_BASE_REST_API_URL + '/get-listing/' + realestatesId,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    updateRealEstate(realestatesId, realestates){
        return axios.put(REALESTATE_BASE_REST_API_URL + '/update-listing/' + realestatesId, realestates,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    deleteRealEstate(realestatesId){
        return axios.delete(REALESTATE_BASE_REST_API_URL + '/delete-listing/' + realestatesId,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    searchRealEstate(keyword) {
        return axios.get(REALESTATE_BASE_REST_API_URL + '/search-keywork?keyword=' + keyword,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    multipleSearchRealEstate(price,area,floor_space,room){
        return axios.get(REALESTATE_BASE_REST_API_URL+"/search-filter?price="+price+"&area="+area+"&floor_space="+floor_space+"&room="+room, {headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

}

export default new RealEstateService();