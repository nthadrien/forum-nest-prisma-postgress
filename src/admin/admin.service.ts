import { Injectable, NotFoundException , UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDto } from './admin.dto';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';
import * as bcrypt from "bcrypt";


@Injectable()
export class AdminService {

    constructor(
        private prismaService : PrismaService,
        private jwtService : JwtService
    ) {}

    async SignIn(email : string , pass: string ) : Promise <any> {
        const user = await this..getUser(email);
        const isMatching = await bcrypt.compareSync(pass, user.hash);
        if (!isMatching) {
            throw new UnauthorizedException("invalid Username or Password.");
        }
        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    };

    async getAdmin ( email : string ) : Promise <Admin> {
        const admin = await this.prismaService.admin.findUnique( {
            where : { OR: [
                { email : email },
                { username : email }
            ] }
        })

        if ( !admin ) throw new NotFoundException("Enteries are invalid");
        return admin;
    }

    async AddAdmin ( dto: UpdateDto ) : Promise<any> {
        const admin = '';
    }

    async BanAdmins ( dto : string[] ) : Promise <string> {
        return 'Admins succesfully banned!';
    }

    async BanAccounts ( dto: string[] ) : Promise <string> {
        return 'Accounts Succesfully Banned!!';
    }

    async DeleteAccounts ( dto: string[]) : Promise <string> {
        return 'Accounts Succesfully Banned!!';
    }

    async DeleteMyAccount ( dto: string[] ) : Promise <string> {
        return 'Accounts Succesfully Banned!!';
    }

 }
