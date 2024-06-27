import { Controller, Get, Param, Body, Patch, Delete, Post } from '@nestjs/common';
import { SubForumService } from './sub-forum.service';
import { SubForum } from '@prisma/client';
import { CreateSFDto, UpdateSFDto } from './sub-forum.dto';

@Controller('sub-forum')
export class SubForumController {

    constructor(
        private sfServices: SubForumService
    ) { }

    @Get('name')
    async getForum(@Param('name') name: string): Promise<SubForum> {
        return await this.sfServices.GetSubForum(name);
    }

    @Get()
    async getForums(): Promise<SubForum[]> {
        return await this.sfServices.GetAllSubForums();
    }

    @Post()
    async addSubForum(@Body() dto: CreateSFDto): Promise<SubForum> {
        return await this.sfServices.CreateSubForum(dto);
    }

    @Patch('name')
    async updateSubForum(@Param('name') name: string, @Body() dto: UpdateSFDto): Promise<SubForum> {
        return await this.sfServices.UpdateSubForum(name, dto);
    }

    @Delete('name')
    async deleteSubForum(@Param('name') name: string): Promise<any| null> {
        return await this.sfServices.DeleteSubForum(name);
    }
}
