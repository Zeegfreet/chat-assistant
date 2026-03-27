import { SearchParams, FilterOperators } from "@domain/index";
import { Brackets, SelectQueryBuilder } from "typeorm";

export class TypeOrmSearchHelper {

    constructor(
        private readonly searchFields: string[],
        private readonly filterFields: string[],
        private readonly orderFields: string[]
    ){}

    public apply<T>(
        qb: SelectQueryBuilder<T>, 
        params: Partial<SearchParams>
    ){
        const {
            page = 1,
            limit = 100,
            search,
            filter = {},
            order = {}
        } = params;

        const alias = qb.alias;
        const filters = Object.entries(filter).filter(([key]) => this.filterFields.includes(key));
        const orders = Object.entries(order).filter(([key]) => this.orderFields.includes(key));

        filters.forEach(([field, value]) => {
            if(typeof value !== "object" || value === null || Array.isArray(value)){
                qb.andWhere(`${alias}.${field} = :${field}`, { [field]: value });
                return;  
            }

            const operators = value as FilterOperators;

            if(operators.$gt !== undefined){
                qb.andWhere(`${alias}.${field} > :${field}_gt`, { [`${field}_gt`]:  operators.$gt});
            }

            if(operators.$gte !== undefined){
                qb.andWhere(`${alias}.${field} >= :${field}_gte`, { [`${field}_gte`]:  operators.$gte});
            }

            if(operators.$lt !== undefined){
                qb.andWhere(`${alias}.${field} < :${field}_lt`, { [`${field}_lt`]:  operators.$lt});
            }

            if(operators.$lte !== undefined){
                qb.andWhere(`${alias}.${field} <= :${field}_lte`, { [`${field}_lte`]:  operators.$lte});
            }

            if(Array.isArray(operators.$between) && operators.$between.length === 2){
                qb.andWhere(`${alias}.${field} BETWEEN :${field}_start AND :${field}_end`, { 
                    [`${field}_start`]:  operators.$between[0],
                    [`${field}_end`]:  operators.$between[1]
                });
            }

            if(Array.isArray(operators.$in) && operators.$in.length > 0){
                qb.andWhere(`${alias}.${field} IN (:...${field}_in)`, { [`${field}_in`]:  operators.$in});
            }
        });
        
        if(search && search.length > 0){
            qb.andWhere(
                new Brackets(qb => {
                    this.searchFields.forEach((field, index) => {
                        const paramName = `search_${field}`;
                        const param = `LOWER(${alias}.${field}) LIKE LOWER(:${paramName})`;
                        
                        if(index === 0){
                            qb
                                .where(param, { [paramName]: `%${search}%` });
                        } else {
                            qb
                                .orWhere(param, { [paramName]: `%${search}%` });
                        }
                    });
                })
            );
        }

        qb.skip((page -1) * limit)
            .take(limit);
        
        orders.forEach(([field, value]) => {
            qb.addOrderBy(`${alias}.${field}`, value);
        });

        return qb;
    }

}