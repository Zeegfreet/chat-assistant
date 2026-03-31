import { Column, Entity, ManyToMany } from "typeorm";
import { AiAgents } from "./ai.agents.entity";
import { EntityTemplate } from "./entity-template";

@Entity({ name: "agents_signeds"})
export class AgentsSigneds extends EntityTemplate {
    @Column()
        url: string;
    @Column({ nullable: true, type: "json" })
        headers?: object;

    @ManyToMany(() => AiAgents, agents => agents.signeds)
        agents: AiAgents[];
}