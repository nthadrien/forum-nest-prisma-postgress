import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { SubForumModule } from './sub-forum/sub-forum.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [PrismaModule, UserModule, ProfileModule, AuthModule, AdminModule, PostModule, CommentModule, SubForumModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
