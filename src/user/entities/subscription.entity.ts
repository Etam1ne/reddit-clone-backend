import { Entity, Column } from "typeorm";

@Entity()
export class Subscription {
    @Column()
    userId: number

    @Column()
    communityId: number
}