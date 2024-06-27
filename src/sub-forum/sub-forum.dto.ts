import { IsString, MaxLength } from "class-validator";



export class CreateSFDto {

    @IsString()
    @MaxLength(500)
    description: string;

    @IsString()
    @MaxLength(150)
    name: string;
}

export class UpdateSFDto {

    @IsString()
    @MaxLength(500)
    description?: string;

    @IsString()
    @MaxLength(150)
    name: string;

}