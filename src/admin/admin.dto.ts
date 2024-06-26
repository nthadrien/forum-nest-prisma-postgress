import { IsString, IsNotEmpty, IsEmail, IsBoolean, IsNumber, IsOptional } from "class-validator";


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

export class CreateAdminDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    username: string;

    @IsString()
    role: AdminRoles;

    @IsString()
    hash: string;

    @IsString()
    description: string;

    @IsBoolean()
    online: true;
}

export class UpdateAdminDto {

    @IsEmail()
    email?: string;

    @IsString()
    username?: string;

    @IsString()
    role?: AdminRoles;

    @IsString()
    hash?: string;

    @IsString()
    description?: string;

    @IsBoolean()
    online?: true;
}