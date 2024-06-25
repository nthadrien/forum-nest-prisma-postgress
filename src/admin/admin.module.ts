import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AdminService,PrismaService,{
    provide: APP_GUARD,
    useClass: RolesGuard
  }],
  controllers: [AdminController]
})
export class AdminModule {}
