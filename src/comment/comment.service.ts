import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
    constructor (
        private prismaService : PrismaService
    ){}

    async getComments( id: number ) : Promise<any[]> {
        return await this.prismaService.comment.findMany({
            where: {
                postId : id
            }
        })
    }

    async updateComment() : Promise <Comment | any > {
        return "Comment updated"
    }

    async addComment( dto : any ) : Promise <Comment | any> {
        return "Comment added";
    }


    async getReplies( id:number ) : Promise <any[]> {
        return []
    }


    async deleteComment () : Promise <any| string> {
        return "Comment Deleted Succesfully !"
    }
}
