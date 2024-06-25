import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Request, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { LoginDto, DeleteUserDto } from './auth.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {


    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: LoginDto ) {
        return await this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async Register(@Body() SignUpDto: CreateUserDto): Promise<any> {
        return await this.authService.SignUp(SignUpDto);
    }

    
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @HttpCode(HttpStatus.OK)
    @Post('delete')
    async DeleteMyProfile (@Body() dto:DeleteUserDto ) {
        return await this.authService.deleteMyAccount(dto.email);
    } 
}
