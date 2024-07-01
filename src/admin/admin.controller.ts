import { Controller, Post , Delete, Get, HttpCode, Body, HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { AdminService } from './admin.service';
import { AdminRoles, LoginDto } from './admin.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';


@Controller('admin')
export class AdminController {

    constructor (
        private adminService : AdminService
    ) {}


    @Public()
    @HttpCode(HttpStatus.ACCEPTED)
    @Post('login')
    async AdminSignIn(@Body() signInDto: LoginDto ) {
        return await this.adminService.SignIn(signInDto.email, signInDto.password);
    }


    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async AdminRegistration(@Body() signInDto: any  ) {
        return await this.adminService.DeleteAccounts(signInDto);
    }

    @Roles(AdminRoles.Admin)
    @HttpCode(HttpStatus.OK)
    @Post('ban-accounts')
    async BanAccounts(@Body() dto : string[] ) : Promise<any>{
        return await this.adminService.DeleteAccounts(dto);
    }


    @Roles(AdminRoles.Admin)
    @Post('ban-admins')
    async BanAdmins (@Body() dto:string[]): Promise<any> {
        return await this.adminService.BanAccounts(dto);
    }

    @Roles(AdminRoles.Admin)
    @Delete('delete-accounts')
    async AccountsDeletion(@Body() dto : string[] ) : Promise<any>{
        return await this.adminService.DeleteAccounts(dto);
    }
}
