import { User } from "./User";

export class Session {
    id: string;
    isActive: boolean;
    origin: string;
    secret?: string;
    closeReason?: string;
    refreshedAt?: Date;
    closedAt?: Date;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}