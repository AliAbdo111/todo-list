import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) { }

  // create todo for user
  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.save(createTodoDto);
  }

  // find all todo's for user creaated before
  async findAll() {
    return await this.todoRepository.find({relations:{
      category:true
    }});
  } 

  //finde specific todo 
  async findOne(id: any) { 
    return await this.todoRepository.find({
      where:{
        user:{id: id}
      },relations:{
        category:true
      }
    })
  }

  // update todo by id
  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.todoRepository.update(id, updateTodoDto);
  }
  // delete todo by id
 async remove(id: number) {
    return await this.todoRepository.delete(id)
  }
}
