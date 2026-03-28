import { Column, Entity } from "typeorm";
import { EntityTemplate } from "./entity-template";

enum ROLES {
    USER = "user",
    MODEL = "model" 
}

@Entity()
export class Messages extends EntityTemplate{
    @Column({ name: "account_id" })
        accountId: string;
    @Column({ name: "conversation_id" })
        conversationId: string;
    @Column()
        role: string;
    @Column()
        message_type: string;
    @Column()
        content_type: string;
    @Column({ nullable: true })
        text: string | null;
    @Column({ nullable: true })
        content: string | null;
}