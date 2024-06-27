import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SubForum } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSFDto, UpdateSFDto } from './sub-forum.dto';


@Injectable()
export class SubForumService {

    constructor(
        private prismaService : PrismaService
    ) {}
    
    async GetSubForum (   name : string , id?:number  ): Promise <SubForum> {
        return await this.prismaService.subForum.findFirst({
            where: { OR: [
                { id },
                { name }
            ]},
            include : {
                modeators: true
            }
        })
    }

    async GetAllSubForums ( ) : Promise <SubForum[] > {
        return await this.prismaService.subForum.findMany({});
    }

    async CreateSubForum  (dto: CreateSFDto ) : Promise <SubForum> {
        const exist = await this.GetSubForum(dto.name);

        if ( exist ) throw new UnauthorizedException("Sub Forum exist Already. Please use another name");

        return await this.prismaService.subForum.create({
            data : dto
        });
    }

    async UpdateSubForum ( id: string, dto: UpdateSFDto ) : Promise <SubForum> {
        const exist = await this.GetSubForum(id);
        if ( !exist ) throw new BadRequestException("SubForum Dosenot exist.");
        return await this.prismaService.subForum.update({
            where: { name : id },
            data : dto
        });
    }

    async DeleteSubForum ( name : string ) : Promise <any | string > {
        const exist = await this.GetSubForum(name);
        if ( !exist ) throw new BadRequestException("SubForum Dosenot exist.");
        return await this.prismaService.subForum.delete({
            where: { name : name }
        });
    }


}
