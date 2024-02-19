import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'varchar', length: 255 })
    author: string;

    @Column({ type: 'varchar'})
    description: string;

    @Column({ type: 'text', array: true, default: [], nullable: true })
    images: string[];

    @Column({ type: 'text', array: true, default: [], nullable: true })
    tags: string[];

    @Column({ type: 'text', array: true, default: [], nullable: true })
    comments: string[];
}
