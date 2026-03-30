import { Column, Entity, ManyToOne } from "typeorm";
import { EntityTemplate } from "./entity-template";
import { AiAgents } from "./ai.agents.entity";

@Entity()

export class Credentials extends EntityTemplate {
    @Column({ unique: true })
        name: string;
    @Column({ nullable: true, name: "access_token" })
        accessToken?: string;
    @Column({ nullable: true, name: "refresh_token" })
        refreshToken?: string;
    @Column({ nullable: true })
        code?: string;
    @Column({ nullable: true, name: "account_id" })
        accountId?: string;
    
    @ManyToOne(() => AiAgents, agents => agents.credentials)
        agents?: AiAgents;
}