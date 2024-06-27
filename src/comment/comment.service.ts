import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePCDto, UpdatePCDto, createCRDto } from './comment.dto';

@Injectable()
export class CommentService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async getComments(id: number): Promise<any[]> {
        return await this.prismaService.comment.findMany({
            where: {
                postId: id,
                origin: null,
            },
            include: {
                replies: true,
                commentReactions: true
            }
        })
    }

    async updateComment(id: number, dto: UpdatePCDto): Promise<Comment | any> {
        return await this.prismaService.comment.update({
            where: { postId: id , id: dto.id },
            data: { message: dto.message}
        });
    }

    async addComment(dto: CreatePCDto): Promise<Comment | any> {

        const { message } = dto
        if (dto.commentId)

            return await this.prismaService.comment.create({
                data: {
                    message,
                    post: {
                        connect: { id: dto.postId }
                    },
                    user: {
                        connect: { id: dto.userId }
                    }
                }
            });

        else return await this.prismaService.comment.create({
            data: {
                message,
                origin: {
                    connect: { id: dto.commentId }
                },
                post: {
                    connect: { id: dto.postId }
                },
                user: {
                    connect: { id: dto.userId }
                }
            }
        });
    }


    async getReplies(id: number): Promise<any[]> {
        return await this.prismaService.comment.findMany({
            where: { commentId: id },
            include: {
                replies: true,
                commentReactions: true
            }
        })
    }


    async deleteComment(user, id ): Promise<any | string> {
        const deleted =  await this.prismaService.comment.delete({
            where: { id: id, userId: user }
        });

        if ( !deleted ) throw new BadRequestException("You are not allowed to delete someone comment!");
        return "Comment Deleted with success !!!";
    }
}
