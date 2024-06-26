import { Module } from '@nestjs/common';
import { SubForumController } from './sub-forum.controller';
import { SubForumService } from './sub-forum.service';

@Module({
  controllers: [SubForumController],
  providers: [SubForumService]
})
export class SubForumModule {}
