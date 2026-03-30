import { Column, Entity, ManyToOne } from "typeorm";
import { EntityTemplate } from "./entity-template";
import { AiAgents } from "./ai.agents.entity";

@Entity()
export class Prompts extends EntityTemplate {
    @Column({ unique: true })
        name: string;
    @Column()
        prompt: string;
    
    @ManyToOne(() => AiAgents, agents => agents.prompt)
        agents: AiAgents;
}