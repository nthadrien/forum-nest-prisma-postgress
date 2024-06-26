import { Body, Controller, Get, Post, Delete, Request } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {

    constructor(
        private commentService : CommentService
    ){}


    @Get(':id')
    async getPostComments (@Request() id: number ) : Promise <any[] | null > {
        return await this.commentService.getComments(id);
    }

    




    @Delete(':id')
    async deletComment () : Promise <any | null > {
        return this.commentService.deleteComment();
    }

}
