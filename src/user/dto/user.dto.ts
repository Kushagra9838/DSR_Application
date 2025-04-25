import { IsEmail, IsString, MinLength, MaxLength, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID('4', { message: 'User ID must be a valid UUID' }) 
  userId: string;

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
