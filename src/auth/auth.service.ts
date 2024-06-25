import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.userService.getUser(email);
        const isMatching = await bcrypt.compareSync(pass, user.hash);
        if (!isMatching) {
            throw new UnauthorizedException("invalid Username or Password.");
        }
        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async SignUp(dto: CreateUserDto): Promise<any | null> {
        const user = await this.userService.createUser(dto);
        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    };

    async SignOut(email: string, pass: string): Promise<any> {
        const user = await this.userService.getUser(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
    }

    async deleteMyAccount( email : string ) : Promise <string> {
        const user = await this.userService.deleteUser(email);
        return user;
    }

}