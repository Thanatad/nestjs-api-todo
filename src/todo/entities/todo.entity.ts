import { User } from "src/auth/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column()
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;

    @ManyToOne(type => User, user => user.todo, { eager: false })
    user: User;

    @Column({ type: 'int' })
    userId: number;
}

