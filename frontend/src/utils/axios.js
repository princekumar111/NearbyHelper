// src/utils/axios.js

import axios from "axios";

const API = axios.create({
    baseURL: "https://nearbyhelper-backend.onrender.com/api",
});

// Automatically attach token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Catch JWT expiration
API.interceptors.response.use(
    (response) => response,

    (error) => {
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