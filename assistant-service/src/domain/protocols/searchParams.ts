
export type Primitive = string | number | boolean | Date;

export interface FilterOperators {
    $gt?: unknown,
    $gte?: unknown,
    $lt?: unknown,
    $lte?: unknown,
    $between?: [unknown, unknown],
    $in?: unknown[]
}

export type FilterValue = 
    | unknown
    | FilterOperators

export interface SearchParams {
    page: number,
    limit: number,
    search: string,
    order: Record<string, "ASC" | "DESC">
    filter: Record<string, FilterValue>
}

export interface SearchResult<T> {
    totalPages: number,
    currentPage: number,
    data: T[]
}