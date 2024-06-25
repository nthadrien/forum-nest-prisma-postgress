import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto, CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = parseInt(process.env.SALT_OR_ROUNDS);

@Injectable()
export class UserService {

    constructor(
        private prismaSevice: PrismaService
    ) { }

    async getUser(email: string): Promise<any | null> {
        const user = await this.prismaSevice.user.findUnique({
            where: { email },
            select: {
                email: true,
                username: true,
                createdAt: true,
                hash : true
            },
        });
        if ( !user ) throw new NotFoundException('User dose not exit.')
        return user;
    };


    async getUsers(): Promise<any[] | null> {
        return await this.prismaSevice.user.findMany();
    }

    async updateUser(dto: UpdateUserDto): Promise<any> {

        return await this.prismaSevice.user.update({
            where: { email: dto.email }, data: dto, select: {
                email: true,
                username: true,
                createdAt: true
            }
        });
    }

    async createUser(dto: CreateUserDto): Promise<any> {

        dto.hash = await bcrypt.hashSync( dto.hash , saltOrRounds);
        
        return await this.prismaSevice.user.create({
            data: dto,
            select: {
                email: true,
                username: true,
                createdAt: true
            }
        })
    }

    async deleteUser ( email: string ) : Promise <string> {
        const user = await this.prismaSevice.user.delete({ where: { email }});
        return  user.username + " was succesfully deleted!"
    }
}
