import axios from "axios";

const PRO_API_BASE_URL = "http://localhost:8100/user";

const config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }
}

class UserService {

    getAllUser(params) {
        return axios.get(PRO_API_BASE_URL + "/all-users",
            {
                params: params,
                headers: config.headers
            }
        );
    }

    deleteUser(id) {
        return axios.delete(PRO_API_BASE_URL + "/delete-user/" + id, {
            headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
        });
    }

    getUserById(id) {
        return axios.get(PRO_API_BASE_URL + "/get-user/" + id, {
            headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
        });
    }

    updateUser(id, account) {
        return axios.put(PRO_API_BASE_URL + "/update-user/" + id, account, {
            headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
        });
    }

    uploadAvatar(id, fileFormData) {
        return axios.post(PRO_API_BASE_URL + "/upload-avatar/" + id, fileFormData, {
            headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
        });
    }

    changePassword(password) {
        return axios.post(PRO_API_BASE_URL + "/change-password", password, {
            headers: { 'Authorization': "Bearer " + localStorage.getItem("accessToken") }
        });
    }

}

export default new UserService();