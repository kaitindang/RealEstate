import axios from "axios"
const BASE_URL = "http://localhost:8060/photo"
const config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }
}
class ImageService {
    getAllImages() {
        return axios.get(BASE_URL,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    
    }
    getImagesId(id_product) {
        return axios.get(BASE_URL + "/" + id_product,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    
    }
    uploadImage(fileFormData){
        return axios.post(BASE_URL+"/upload", fileFormData, {headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

}
export default new ImageService();