import axios from "axios";

const API = axios.create({
    baseURL: "https://nearbyhelper-backend.onrender.com/api",
});

API.interceptors.request.use(
    function(config) {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }

        return config;
    },

    function(error) {
        return Promise.reject(error);
    }
);


API.interceptors.response.use(
    function(response) {
        return response;
    },

    function(error) {

        if (
            error.response &&
            error.response.data &&
            error.response.data.msg === "jwt expired"
        ) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default API;