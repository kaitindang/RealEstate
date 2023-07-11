import axios from "axios"
const BASE_URL = "http://localhost:8091/file"
const config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }
}
class FileService {
    getAllImages() {
        return axios.get(BASE_URL,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    
    }
    getImagesId(id_product) {
        return axios.get(BASE_URL + '/images-product/' + id_product,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    
    }
    uploadImage(fileFormData){
        return axios.post(BASE_URL+'/upload', fileFormData, {headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

}
export default new FileService();