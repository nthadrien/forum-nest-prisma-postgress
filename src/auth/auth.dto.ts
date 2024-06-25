import { IsString, IsNotEmpty, IsEmail } from "class-validator"



export class LoginDto {

    @IsEmail()
    email : string;

    @IsString()
    @IsNotEmpty()
    password: string;

}


export class DeleteUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}