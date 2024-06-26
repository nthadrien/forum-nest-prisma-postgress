import { IsNumber, IsString } from "class-validator";



export class CreateProfileDto {

    @IsString()
    aboutMe: string;

    @IsNumber()
    userId: number
}

export class UpdateProfileDto {


    @IsNumber()
    id: number;

    @IsString()
    aboutMe: string;

    @IsNumber()
    userId: number
}