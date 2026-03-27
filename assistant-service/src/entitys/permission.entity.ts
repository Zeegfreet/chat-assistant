import { Column, Entity, ManyToMany, Unique } from "typeorm";
import { EntityTemplate } from "./entity-template";
import { Role } from "./role.entity";

@Entity()
@Unique("UQ_RESOURCE_METHOD", ["resource", "method"])
export class Permission extends EntityTemplate{
    @Column()
        resource: string;
    @Column()
        method: string;
    
    @ManyToMany(() => Role, role => role.permissions)
        roles: Role[];

}