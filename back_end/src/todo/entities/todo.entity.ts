import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { PrimaryGeneratedColumn ,Column, Entity, OneToOne, ManyToOne } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string

    @ManyToOne(type=>User ,user=>user.todos)
    user:User;
  
    @ManyToOne(() => Category, (category) => category.todos)
    category: Category


}
