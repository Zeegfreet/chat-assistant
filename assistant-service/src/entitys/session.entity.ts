import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Session {
    @PrimaryGeneratedColumn("uuid")
        id: string;
    @Column()
        isActive: boolean;
    @Column()
        origin: string;
    @Column({ name: "close_reason", nullable: true })
        closeReason?: string;
    @Column({ name: "secret", nullable: true })
        secret: string;
    @Column({ name: "refreshed_at", nullable: true })
        refreshedAt?: Date;
    @Column({ name: "closed_at", nullable: true })
        closedAt?: Date;
    @ManyToOne(() => User, user => user.sessions)
        user: User;
    @CreateDateColumn({ name: "created_at" })
        createdAt: Date;
    @UpdateDateColumn({ name: "updated_at" })
        updatedAt: Date;
    
}