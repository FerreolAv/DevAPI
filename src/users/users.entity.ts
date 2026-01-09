import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum UserRole {
    STUDENT = "STUDENT",
    LIBRARIAN = "LIBRARIAN",
    ADMIN = "ADMIN",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    lastname: string;

    @Column({ nullable: true })
    firstname: string;

    @Column({ type: "text", default: "STUDENT" })
    role: string;

    @Column({ default: false})
    isWhitelisted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}