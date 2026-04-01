import { http } from "@/http/http"
import includeCredentials from "./includeCredentials"
import qs from "qs"


export const paths = {
    credentials: {
        search: "/v1/credentials",
        create: "/v1/credentials",
        delete: "/v1/credentials",
        findById: "/v1/credentials"
    }
}

export type IPathName = keyof typeof paths

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


export interface ISearchQuery {
    page?: number
    limit?: number
    search?: string
    filter?: {
        [key: string | number]: any
    },
    order?: {
        [key: string | number]: "ASC" | "DESC"
    }
}

export const httpServices = {
    create: async <T = any>(pathName: IPathName, payload: T): Promise<IServiceResponse<T>> => {
        try {
            includeCredentials()
            const path = paths[pathName]["create"]
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
    findById: async <T = any>(pathName: IPathName, id: string | number): Promise<IServiceResponse<T>> => {
        try {
            includeCredentials()
            const path = paths[pathName]["findById"]
            const url = path + "/" + String(id)
            const response = await http.get(url)
            return {
                success: true,
                data: response.data.resources
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                error: (error as Error).message
            }
        }
    },
    delete: async <T = any>(pathName: IPathName, id: string | number): Promise<IServiceResponse<T>> => {
        try {
            includeCredentials()
            const path = paths[pathName]["delete"]
            const url = path + "/" + String(id)
            await http.delete(url)
            return {
                success: true,
                data: null
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                error: (error as Error).message
            }
        }
    },
    search: async <T = any>(pathName: IPathName, query: ISearchQuery): Promise<ISearchResponse<T>> => {
        try {
            includeCredentials()
            const queryParams = qs.stringify(query)
            const path = paths[pathName]["search"]
            const url = path + "?" + queryParams
            const response = await http.get(url, { params: { q: queryParams } })
            return {
                success: true,
                data: {
                    totalPages: response.data.resources.totalPages,
                    currentPage: response.data.resources.currentPage,
                    data: response.data.resources.data
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