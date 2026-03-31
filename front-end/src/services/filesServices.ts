import { httpFiles } from "@/http/httpFiles";
import store from "@/store";
import { sessionActions } from "@/store/session/actions";
import { AxiosError } from "axios";


const includeCredentials = () => {

    httpFiles.interceptors.request.use(config => {
        const accessToken = store.getState().session.accessToken;
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    });

    httpFiles.interceptors.response.use(
        response => response,
        async (error: AxiosError) => {
            const originalRequest: any = error.config;
            const errorData = error.response?.data instanceof Blob ? JSON.parse(await error.response.data.text()) : error.response?.data
            if(error.response?.status === 403){
                const errorData = error.response?.data instanceof Blob ? JSON.parse(await error.response.data.text()) : error.response?.data
                if(errorData && errorData.error === "SESSION_REVOKED_ERROR"){
                    return store.dispatch(sessionActions.signOut())
                }
            }
            if (error.response?.status === 401 && !originalRequest._retry) {
                
                if(errorData.error === "SESSION_EXPIRED_ERROR"){
                    originalRequest._retry = true;
    
                    await store.dispatch(sessionActions.refresh());
    
                    const isSuccess = store.getState().session.isSuccess;
    
                    if (isSuccess) {
    
                        const newAccessToken = store.getState().session.accessToken;
    
                        originalRequest.headers = {
                            ...originalRequest.headers,
                            Authorization: `Bearer ${newAccessToken}`
                        };
    
                        return httpFiles(originalRequest);
                    }

                }
            }

            return Promise.reject(error);
        }
    );
}



export const filesServices = {
    getFile: async (url: string, eTag?: string) => {
        try {
            includeCredentials()
            const response = await httpFiles.get(url, {
                headers: {
                    "if-none-match": eTag
                },
                responseType: "blob"
            })
        
            if(response.status === 304){
                return {
                    success: true,
                    contentChange: false,
                    
                }
            }
            
            return {
                success: true,
                contentChange: true,
                binary: response.data,
                eTag: response.headers["eTag"]
            }
        } catch (error) {
            if(error instanceof AxiosError){
                return {
                    success: false,
                    message: error.message
                }
            }
            return {
                success: false,
            }
        }
    },
    deleteFile: async (url: string) => {
        try {
            includeCredentials()
            await httpFiles.delete(url)

            return {
                success: true,
                error: null
            }
        } catch (error) {
            if(error instanceof AxiosError){
                if(error.response?.data){
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