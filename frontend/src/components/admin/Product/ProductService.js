import axios from "axios";

const PRO_API_BASE_URL = "http://localhost:8091/admin/product";


class ProductService{
    saveProduct(product){
        return axios.post(PRO_API_BASE_URL,product,
            {headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
        });
    }

    getProduct(page, size){
        return axios.get(PRO_API_BASE_URL, "?page="+page+"&size="+size,
            {headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
        });
    }

    getProductWaiting(){
        return axios.get(PRO_API_BASE_URL + "/product-waiting",
            {headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
        });
    }

    deleteProduct(id_product){
        return axios.delete(PRO_API_BASE_URL + "/" + id_product,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    getProductById(id_product){
        return axios.get(PRO_API_BASE_URL + "/" + id_product,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    updateProduct(id,product){
        return axios.put(PRO_API_BASE_URL + "/" + id, product,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    enableProduct(id,product){
        return axios.put(PRO_API_BASE_URL + "/enable-product" + "/" + id, product,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }

    approveProduct(id,product){
        return axios.put(PRO_API_BASE_URL + "/approve-product" + "/" + id, product,{headers: {'Authorization':"Bearer " +  localStorage.getItem("accessToken")}
    });
    }
}

export default new ProductService();