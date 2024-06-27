import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";



export class CreatePCDto {
    @IsString()
    @MaxLength(300)
    @MinLength(12)
    message: string;

    @IsNumber()
    postId: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    commentId?: number;

}

export class UpdatePCDto {
    @IsNumber()
    id: number;
    
    @IsString()
    @MaxLength(300)
    @MinLength(12)
    message: string;
};

export class createCRDto {  //createReply Dto

    @IsString()
    @MaxLength(300)
    @MinLength(12)
    message: string;

    @IsNumber()
    postId: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    origin: number;

}