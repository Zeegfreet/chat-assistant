import axios from "axios"

export const httpFiles = axios.create({
    baseURL: import.meta.env.VITE_FILES_URL || "http://localhost:8000/files",
})