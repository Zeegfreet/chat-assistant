import axios from "axios"

export const http = axios.create({
    baseURL: import.meta.env.VITE_SERVICES_URL || "http://localhost:8000/api",
})