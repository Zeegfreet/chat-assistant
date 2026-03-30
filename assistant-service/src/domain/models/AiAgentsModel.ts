import { BaseEntity } from "./BaseEntity";
import { CredentialsModel } from "./CredentialsModel";
import { PromptsModel } from "./PromptsModel";

export class AiAgentsModel extends BaseEntity {
    name: string;
    slug: string;
    model: string;
    provider: string;
    isActive?: boolean;
    credentials?: CredentialsModel;
    prompt?: PromptsModel;
}