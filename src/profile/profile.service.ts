import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Profile } from "prisma/prisma-client"
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async CreateProfile(dto: CreateProfileDto): Promise<Profile> {
        return await this.prismaService.profile.create({
            data: dto
        })
    }

    async GetProfile(id: number): Promise<Profile | null> {
        return await this.prismaService.profile.findUnique({
            where: {
                userId: id
            }
        });
    }

    async UpdateProfile(id: number, dto: UpdateProfileDto): Promise<Profile> {
        const old = await this.GetProfile(id);
        if (!old) throw new NotFoundException("Profile is not in the database!");
        return await this.prismaService.profile.update({
            where: { userId: id },
            data: dto
        })
    }

    async DeleteProfile ( id : number ) : Promise <string> {
        try {
            await this.prismaService.profile.delete({ where : { id }})
            return "Profile succesfully deleted";
        } catch (err) {
            throw new BadRequestException("Ooopps dosenot exist or something went wrong")
        }
    }
}
