import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { LoginDto, DeleteUserDto } from './auth.dto';
import { Public } from './decorators/public.decorator';
import {Response, Request } from "express";
 

@Controller('auth')
export class AuthController {


    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: LoginDto, @Res({ passthrough: true }) response: Response) : Promise <any> {
        return await this.authService.signIn(signInDto.email, signInDto.password, response );
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async Register(@Body() SignUpDto: CreateUserDto, @Res({ passthrough: true }) response: Response): Promise<any> {
        return await this.authService.SignUp(SignUpDto, response );
    }
    
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

    @HttpCode(HttpStatus.OK)
    @Post('delete')
    async DeleteMyProfile (@Body() dto:DeleteUserDto ) {
        return await this.authService.deleteMyAccount(dto.email);
    } 
}
