import { AbstractEntity } from "../../../common/abstract.entity";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { ERole } from "../../../constants/role.enum";
import { Activity } from "../../activity/entities/activity.entity";

@Entity()
export class User extends AbstractEntity {
    @Column({ nullable: true })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: false, default: false })
    confirmed: boolean;

    @Column({ nullable: false, default: ERole.USER, enum: ERole, type: "enum" })
    role: ERole;
    
    // relations
    @OneToMany(() => Activity, (activity) => activity.owner, {
        eager: true,
        cascade: true,
    })
    @JoinColumn()
    activities: Activity[];
}
