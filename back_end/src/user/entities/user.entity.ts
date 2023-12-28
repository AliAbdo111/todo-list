import { Todo } from "src/todo/entities/todo.entity";
import { Entity,Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true})
    name:string

    @Column({nullable:true })
    img_url?:string

    @Column({nullable:true})
    linkedIn_url:string

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @Column()
    @IsNotEmpty()
    password:string

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[]

}
