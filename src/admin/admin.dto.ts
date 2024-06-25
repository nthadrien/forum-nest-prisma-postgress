import { IsString, IsNotEmpty, IsEmail, IsBoolean } from "class-validator";


export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}

export enum AdminRoles {
    Moderator = 'moderator',
    Admin = 'super-admin'
}

export class UpdateDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    role: AdminRoles[];

    @IsString()
    @IsNotEmpty()
    hash: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsBoolean()
    online: true;
}