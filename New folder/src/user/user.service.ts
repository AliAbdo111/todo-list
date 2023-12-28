import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>) { }


  async create(createUserDto: CreateUserDto) {
    let hash = await this.hashPAssword(createUserDto.password)
    const res = await this.userRepository.save({ ...createUserDto, password: hash })
    return res
  }

  async signIn(input: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ email: input.email });
    if (user) {
      const validPassowrd = await this.isMatch(input.password, user.password)
      if (validPassowrd) {
        return true
      } 
      return false
    }
    return false

  }
  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    return await this.userRepository.findBy({ id: id })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
  // hashing password using bcrypt
  async hashPAssword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash
  }
  // compare betweeen password old regestration and password login
  async isMatch(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }



}
