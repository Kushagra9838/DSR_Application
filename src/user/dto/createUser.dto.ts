import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString() 
  @MinLength(3, { message: 'Name must be at least 3 characters long' }) 
  @MaxLength(50, { message: 'Name cannot be longer than 50 characters' }) 
  name: string;

  @IsEmail({}, { message: 'Invalid email format' }) 
  email: string;

  @IsString() 
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) 
  password: string;
}
