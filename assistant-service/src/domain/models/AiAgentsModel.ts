import { BaseEntity } from "./BaseEntity";
import { CredentialsModel } from "./CredentialsModel";
import { SignedsModel } from "./SignedsModel";

export class AiAgentsModel extends BaseEntity {
    name: string;
    slug: string;
    model: string;
    provider: string;
    prompt: string;
    isActive?: boolean;
    credentials?: CredentialsModel;
    signeds?: SignedsModel[];
}