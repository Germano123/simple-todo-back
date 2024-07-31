import { AbstractEntity } from "../../../common/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Activity extends AbstractEntity {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    done: boolean;

    // relations
    @ManyToOne(() => User, (user) => user.activities)
    owner: User;
}
