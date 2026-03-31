import { Column, Entity, ManyToOne } from "typeorm";
import { EntityTemplate } from "./entity-template";
import { Credentials } from "./credentials.entity";

@Entity({ name: "ai_agents" })
export class AiAgents extends EntityTemplate {
    @Column({ unique: true })
        name: string;

    @Column({ unique: true })
        slug: string;

    @Column()
        model: string;

    @Column({ default: true })
        isActive?: boolean;

    @Column()
        provider: string;

    @Column()
        prompt: string;
    
    @ManyToOne(() => Credentials, credentials => credentials.agents)
        credentials?: Credentials;

}