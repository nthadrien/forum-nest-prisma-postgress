import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto, UpdateAdminDto } from './admin.dto';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';
import * as bcrypt from "bcrypt";

const saltOrRounds = parseInt(process.env.SALT_OR_ROUNDS)

@Injectable()
export class AdminService {

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) {}

    async SignIn(email: string, pass: string): Promise<any> {
        const user = await this.GetAdmin(email);
        const isMatching = await bcrypt.compareSync(pass, user.hash);
        if (!isMatching) {
            throw new UnauthorizedException("invalid Username or Password.");
        }
        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    };

    async GetAdmin(email: string): Promise<Admin> {
        const admin = await this.prismaService.admin.findFirst({
            where : {
               OR: [ {email} ,{ username : email }]
            }
        })
        if (!admin) throw new NotFoundException("Enteries are invalid");
        return admin;
    }

    async UpdateProfile (id:number , dto : UpdateAdminDto ) {
        if ( dto.hash ) dto.hash = await bcrypt.hashSync( dto.hash , saltOrRounds);
        return await this.prismaService.admin.update({
            where: {id },
            data: dto,
            select: {
                email: true,
                username: true,
                createdAt: true
            }
        }); 
    }

    async SignUp(dto: CreateAdminDto ): Promise<any> {
        dto.hash = await bcrypt.hashSync( dto.hash , saltOrRounds);
        return await this.prismaService.admin.create({
            data: dto,
            select : {
                email: true,
                username: true,
                createdAt: true
            }
        }) 

    }

    async BanAccounts(dto: string[]): Promise<string> {
        return 'Accounts Succesfully Banned!!';
    }

    async DeleteAccounts(dto: string[]): Promise<string> {
        return 'Accounts Succesfully Banned!!';
    }

    async DeleteMyAccount(dto: string[]): Promise<string> {
        return 'Accounts Succesfully Banned!!';
    }

}
