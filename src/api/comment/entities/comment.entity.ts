import { Entity, Column, Timestamp, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    postId: number

    @Column()
    parentCommentId: number

    @Column()
    userId: number

    @Column()
    votes: number

    @Column({ type: "timestamptz" })
    createdAt: Date
}