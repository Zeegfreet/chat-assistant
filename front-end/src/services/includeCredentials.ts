import { http } from "@/http/http";
import store from "@/store";
import { sessionActions } from "@/store/session/actions";
import type { AxiosError } from "axios";

const includeCredentials = () => {

    http.interceptors.request.use(config => {
        const accessToken = store.getState().session.accessToken;
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    });

    http.interceptors.response.use(
        response => response,
        async (error: AxiosError) => {
            const originalRequest: any = error.config;

            if (error.response?.status === 403) {
                const errorData = error.response?.data instanceof Blob ? JSON.parse(await error.response.data.text()) : error.response?.data
                if (errorData && errorData.error === "SESSION_REVOKED_ERROR") {
                    return store.dispatch(sessionActions.signOut())
                }
            }
            if (error.response?.status === 401 && !originalRequest._retry) {
                const errorData = error.response?.data instanceof Blob ? JSON.parse(await error.response.data.text()) : error.response?.data
                if (errorData && errorData.error === "SESSION_EXPIRED") {
                    originalRequest._retry = true;

                    await store.dispatch(sessionActions.refresh());

                    const isSuccess = store.getState().session.isSuccess;
                    if (isSuccess) {

                        const newAccessToken = store.getState().session.accessToken;

                        originalRequest.headers = {
                            ...originalRequest.headers,
                            Authorization: `Bearer ${newAccessToken}`
                        };

                        return http(originalRequest);
                    }

                    return store.dispatch(sessionActions.signOut())

                }
            }

            return Promise.reject(error);
        }
    );
}

export default includeCredentials;