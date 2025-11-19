import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"

const API_BASE_URL = "https://api.feedback/v1"

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    withCredentials: true, // Send cookies with each request
    headers: {
        "Content-Type": "application/json",
    },
})