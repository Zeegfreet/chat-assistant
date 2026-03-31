import { http } from "@/http/http"
import { AxiosError } from "axios"
import store from "@/store"
import includeCredentials from "./includeCredentials"


export const authServices = {
    signIn: async (payload: unknown) => {
        try {
            const response = await http.post("/pub/signin", payload)
            return {
                success: true,
                data: response.data.resources,
                error: null
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) {
                    return {
                        success: false,
                        data: null,
                        error: error.response.data.error
                    }
                }
            }
            return {
                success: false,
                data: null,
                error: (error as Error).message
            }
        }
    },
    signup: async (payload: unknown) => {
        try {
            const response = await http.post("/pub/signup", payload)
            return {
                success: true,
                data: response.data,
                error: null
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) {
                    return {
                        success: false,
                        data: null,
                        error: error.response.data.error
                    }
                }
            }
            return {
                success: false,
                data: null,
                error: (error as Error).message
            }
        }
    },
    signOut: async () => {
        try {
            includeCredentials()
            await http.post("/pub/signout")


            return {
                success: true,
                error: null
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) {
                    return {
                        success: false,
                        data: null,
                        error: error.response.data.error
                    }
                }
            }
            return {
                success: false,
                data: null,
                error: (error as Error).message
            }
        }
    },
    refresh: async () => {
        const refreshToken = store.getState().session.refreshToken
        try {
            const response = await http.post("/pub/refresh", {
                refreshToken
            })
            return {
                success: true,
                data: response.data.resources,
                error: null
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) {
                    return {
                        success: false,
                        data: null,
                        error: error.response.data.error
                    }
                }
            }
            return {
                success: false,
                data: null,
                error: (error as Error).message
            }
        }
    },
    updateProfile: async (payload: unknown) => {
        try {
            includeCredentials()
            const response = await http.patch("/credentials/v1/profile", payload)

            return {
                success: true,
                error: null,
                result: response.data.resources
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) {
                    return {
                        success: false,
                        data: null,
                        error: error.response.data.error
                    }
                }
            }
            return {
                success: false,
                data: null,
                error: (error as Error).message
            }
        }
    },
    changePassword: async (payload: unknown) => {
        try {
            includeCredentials()
            const response = await http.patch("/credentials/v1/profile/password", payload)

            return {
                success: true,
                error: null,
                result: response.data.resources
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) {
                    return {
                        success: false,
                        data: null,
                        error: error.response.data.error
                    }
                }
            }
            return {
                success: false,
                data: null,
                error: (error as Error).message
            }
        }
    }
}