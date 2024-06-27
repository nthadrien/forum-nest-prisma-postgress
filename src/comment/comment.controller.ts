import { Body, Controller, Get, Post, Patch, Delete, Request, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '@prisma/client';
import { CreatePCDto, UpdatePCDto } from './comment.dto';

@Controller('comments')
export class CommentController {

    constructor(
        private commentService : CommentService
    ){}


    @Get('/:post')
    async getPostComments (@Param('post') post: string ) : Promise <any[] | null > {
        return await this.commentService.getComments(+post);
    }

    @Get('reply/:id')
    async getCommentsReplies(@Param('id') id: string) : Promise <Comment[]> {
        return this.commentService.getReplies(+id);
    }

    @Patch(':id')
    async updatePostComments(@Body() dto: UpdatePCDto, @Param('id') id: string  ) : Promise <Comment> {
        return this.commentService.updateComment(+id, dto);
    }

    @Post()
    async addPostComment(@Body() dto: CreatePCDto ) : Promise <Comment> {
        return this.commentService.addComment(dto);
    }


    @Delete(':id')
    async deletComment (@Request() req, @Param('id') id: string ) : Promise <any | null > {
        return this.commentService.deleteComment(req.user , +id );
    }

}
