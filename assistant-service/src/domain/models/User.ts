import { BaseEntity } from "./BaseEntity";
import { Role } from "./Role";

export class User  extends BaseEntity{
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    isAdmin: boolean;
    isBlocked: boolean;
    deletedAt?: Date;
    isDeleted: boolean;
    isVerified: boolean;
    roles?: Role[];
}