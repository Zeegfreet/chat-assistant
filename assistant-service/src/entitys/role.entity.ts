import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { EntityTemplate } from "./entity-template";
import { Permission } from "./permission.entity";
import { User } from "./user.entity";

@Entity()
export class Role extends EntityTemplate{
    @Column({ unique: true })
        role: string;
    @Column()
        description: string;
    @Column({ default: true })
        isActive: boolean;
    @Column({ default: false })
        isDefault: boolean;

    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable({ name: "role_permissions" })
        permissions: Permission[];

    @ManyToMany(() => User, user => user.roles)
        users?: User[];
}