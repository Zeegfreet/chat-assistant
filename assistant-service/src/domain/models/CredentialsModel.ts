import { BaseEntity } from "./BaseEntity";

export class CredentialsModel extends BaseEntity{
    name: string;
    accessToken?: string;
    refreshToken?: string;
    code?: string;
    accountId?: string;
    // agents: AiAgents;
}