import { Column, Entity, OneToMany } from "typeorm";
import { EntityTemplate } from "./entity-template";
import { Credentials } from "./credentials.entity";
import { Prompts } from "./prompts.entity";

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
    
    @OneToMany(() => Credentials, credentials => credentials.agents)
        credentials?: Credentials;
    
    @OneToMany(() => Prompts, prompts => prompts.agents)
        prompt?: Prompts;
}