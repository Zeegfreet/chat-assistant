import { BaseEntity } from "./BaseEntity";
import { Permission } from "./Permission";

export class Role extends BaseEntity{
    role: string;
    description: string;
    isActive: boolean;
    isDefault: boolean;
    permissions: Permission[];
}