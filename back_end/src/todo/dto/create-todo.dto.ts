import {
    IsNotEmpty,
    IsString,
    MinLength,
    IsAlpha,
    Matches,
    IsEmail,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    title:string;
    
    @IsString()
    @IsNotEmpty()
    description:string
    user:User;
    category: Category


}
