import {
    IsNotEmpty,
    IsString,
    MinLength,
    IsAlpha,
    Matches,
    IsEmail,
} from 'class-validator';

export class CreateUserDto {
   
    name?: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    img_url: string

    @IsNotEmpty()
    @MinLength(8)
    password: string
    
    @IsNotEmpty()
    linkedIn_url:string
} 
