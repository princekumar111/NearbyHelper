// src/utils/axios.js

import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api",
});

// Automatically attach token
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

// Catch JWT expiration
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

            const path = window.location.pathname;

            // public pages par login redirect nahi
            if (
                path !== "/" &&
                !path.startsWith("/providers")
            ) {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default API;