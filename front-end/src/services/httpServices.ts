import { http } from "@/http/http"
import includeCredentials from "./includeCredentials"

export interface IServiceResponse<T> {
    success: boolean
    data: T | null
    error?: string | null
}

export interface ISearchResponse<T> {
    success: boolean
    data: {
        totalPages: number,
        currentPage: number,
        data: T[]
    } | null,
    error?: string | null
}

export const paths = {
    credentials: {
        search: "/v1/credentials/search",
    }
}

export type PathName = keyof typeof paths

export const httpServices = {
    create: async <T = any>(path: string, payload: T): Promise<IServiceResponse<T>> => {
        try {
            includeCredentials()
            const response = await http.post(path, payload)
            return {
                success: true,
                data: response.data.resources,
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                error: (error as Error).message
            }
        }
    },
    search: async <T = any>(pathName: PathName, query: T): Promise<ISearchResponse<T>> => {
        try {
            includeCredentials()
            const queryParams = new URLSearchParams(query as Record<string, string>).toString()
            const path = paths[pathName]["search"]
            const response = await http.get(path, { params: { q: queryParams } })
            return {
                success: true,
                data: {
                    totalPages: response.data.totalPages,
                    currentPage: response.data.currentPage,
                    data: response.data.resources
                },
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                error: (error as Error).message
            }
        }
    }

}