import { IsEmail, IsString, IsNotEmpty, IsBoolean } from "class-validator";


export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    hash: string;

    @IsBoolean()
    online: true;
}


export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    hash: string;

    @IsBoolean()
    online: true;
}