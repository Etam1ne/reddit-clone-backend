import { Entity, Column, Timestamp, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Community {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    image: string

    @Column({ type: "timestamptz" })
    createdAt: Date
}