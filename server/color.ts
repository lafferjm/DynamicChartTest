import {Table, Column, PrimaryGeneratedColumn} from 'typeorm';

@Table()
export class Color {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    color: string;

    @Column("int")
    count: number;
}