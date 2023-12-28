import { Todo } from "src/todo/entities/todo.entity";
import { PrimaryGeneratedColumn ,Entity, Column, OneToMany, } from "typeorm";
@Entity()

// structure table
export class Category {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    CategoryName:string
    @OneToMany(() => Todo, (todo) => todo.category)
    todos: Todo[]

}
