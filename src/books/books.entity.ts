import { Collection, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Books {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    isbn: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    publisher: string;

    @Column()
    year: number;

    @Column()
    totalCopies: number;

    @Column()
    availableCopies: number;

}