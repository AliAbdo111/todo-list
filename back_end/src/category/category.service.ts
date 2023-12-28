import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categotyRepository: Repository<Category>
  ) { }

  // create todo for user
  create(createTodoDto: CreateCategoryDto) {
    return this.categotyRepository.save(createTodoDto);
  }

  // find all todo's for user creaated before
  async findAll() {
    console.log("text")
    return await this.categotyRepository.find();
  }

  //finde specific todo 
  async findOne(id: number) {
    return await this.categotyRepository.findBy({ id: id })
  }

  // update todo by id
  async update(id: number, updateTodoDto: UpdateCategoryDto) {
    return await this.categotyRepository.update(id, updateTodoDto);
  }
  // delete todo by id
 async remove(id: number) {
    return await this.categotyRepository.delete(id)
  }
}
