import { SearchParams } from "@domain/index";
import { SelectQueryBuilder } from "typeorm";

export interface SearchHelper {
    apply<T>(qb: SelectQueryBuilder<T>, params: Partial<SearchParams>): SelectQueryBuilder<T>
}