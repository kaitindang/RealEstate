import axios from "axios";

const PRO_API_BASE_URL = "http://localhost:8091/admin/realestate";

const config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }
}

class ProductService {

    getProduct(params) {
        return axios.get(PRO_API_BASE_URL,
            {
                params: params,
                headers: config.headers
            }
        );
    }

    getProductWaiting() {
        return axios.get(PRO_API_BASE_URL + "/product-waiting",
            {
                headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
            });
    }

    deleteProduct(id_product) {
        return axios.delete(PRO_API_BASE_URL + "/" + id_product, {
            headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
        });
    }

    getProductById(id_product) {
        return axios.get(PRO_API_BASE_URL + "/" + id_product, {
            headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
        });
    }

    updateProduct(id, product) {
        return axios.put(PRO_API_BASE_URL + "/" + id, product, {
            headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
        });
    }

    enableProduct(id, product) {
        return axios.put(PRO_API_BASE_URL + "/enable-product" + "/" + id, product, {
            headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
        });
    }

    approveProduct(id, product) {
        return axios.put(PRO_API_BASE_URL + "/approve-product" + "/" + id, product, {
            headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
        });
    }
}

export default new ProductService();