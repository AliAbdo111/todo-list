import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ScrapingService } from 'src/profile-controller/scraping.service';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService ,private readonly scrapingService:ScrapingService) { }


  async create(createUserDto: CreateUserDto) {

    // check user reagister before by email
    const checkUserExists = await this.userRepository.findOneBy({ email: createUserDto.email })
    if (checkUserExists) {
      return {
        statusCode: 400,
        message: 'Register Successfull',
      };
    }
    // hashing passsword in case user not register before
    const  hash = await this.hashPAssword(createUserDto.password);
    // const userScraping= await t his.scrapingService.scrapeProfileData(createUserDto.linkedIn_url)
    const res = await this.userRepository.save({ ...createUserDto, password: hash })
    return {
      statusCode: 200,
      message: 'Register Successfull',
    };
  }

  async signIn(input: UpdateUserDto) {
  if(!input.email){
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);

  }
    const user = await this.userRepository.findOneBy({ email: input.email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const validPassowrd = await this.isMatch(input.password, user.password)
    if (validPassowrd) {
      const accessToken = this.generateJWT({sub:user.id,userName:user.name})
      return {
        statusCode: 200,
        message: 'Login successfully',
        accessToken: accessToken,
      };
    }
    throw new HttpException(
      'User or password not match',
      HttpStatus.UNAUTHORIZED,
    );
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

// generat token 
generateJWT(payload:any){
  return this.jwtService.sign(payload, {
    secret:  'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
    expiresIn: 3600,
  });
}



}
