import { BeforeRecover, BeforeSoftRemove, Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, Unique } from "typeorm";
import { EntityTemplate } from "./entity-template";
import { Role } from "./role.entity";
import { Session } from "./session.entity";

@Entity()
@Unique("UQ_EMAIL_DELETED_AT", ["email", "isDeleted"])
export class User extends EntityTemplate{
    @Column()
        name: string;
    @Column()
        email: string;
    @Column()
        password: string;
    @Column({ default: true, name: "is_active" })
        isActive: boolean;
    @Column({ default: false, name: "is_admin" })
        isAdmin: boolean;
    @Column({ default: false, name: "is_blocked" })
        isBlocked: boolean;
    @DeleteDateColumn({ name: "deleted_at" })
        deletedAt?: Date;
    @Column({ default: false })
        isDeleted: boolean;
    @Column({ default: false, name: "is_verified" })
        isVerified: boolean;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({ name: "user_roles" })
        roles?: Role[];
    
    @OneToMany(() => Session, session => session.user)
        sessions?: Session[];

    @BeforeSoftRemove()
    markAsDeleted() {
        this.isDeleted = true;
    }

    @BeforeRecover()
    unmarkAsDeleted() {
        this.isDeleted = false;
    }

}