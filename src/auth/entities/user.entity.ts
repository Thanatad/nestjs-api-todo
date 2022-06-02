import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt"

import { UserInfo } from "../../user/entities/user-info.entity";
import { Exclude } from "class-transformer";
import { Todo } from "src/todo/entities/todo.entity";

@Entity()
@Unique(['username'])

export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    username: string

    @Column({ type: "varchar" })
    password: string

    @Column()
    salt: string

    @Column({ nullable: true })
    @Exclude()
    public hashedRefreshToken?: string

    @OneToMany(type => Todo, Todo => Todo.user, { eager: true })
    todo: Todo[]

    @OneToOne(type => UserInfo, { eager: true })
    @JoinColumn()
    user_info: UserInfo

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}