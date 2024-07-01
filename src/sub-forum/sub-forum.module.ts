import { Module } from '@nestjs/common';
import { SubForumController } from './sub-forum.controller';
import { SubForumService } from './sub-forum.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SubForumController],
  providers: [SubForumService,PrismaService]
})
export class SubForumModule {}
