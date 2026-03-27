import { BaseEntity } from "./BaseEntity";

export class Permission extends BaseEntity{
    resource: string;
    method: string;
}