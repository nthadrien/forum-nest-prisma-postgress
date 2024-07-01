import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from './contants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [UserModule, JwtModule.register({
    global: true, ...jwtConstants,
  })],
  providers: [
    AuthService,
    PrismaService, 
    {
     provide: APP_GUARD,
     useClass: AuthGuard
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
