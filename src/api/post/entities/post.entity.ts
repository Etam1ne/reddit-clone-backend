import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    communityId: number

    @Column()
    header: string

    @Column()
    image: string

    @Column()
    textContent: string

    @Column({ type: "timestamptz" })
    createdAt: Date
}