import { Column, Entity } from "typeorm";
import { EntityTemplate } from "./entity-template";

@Entity()
export class Prompts extends EntityTemplate {
    @Column({ unique: true })
        name: string;
    @Column()
        prompt: string;

}