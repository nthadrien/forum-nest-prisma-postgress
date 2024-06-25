import { 
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(
        private userServices : UserService
    ) {}


    @Get(":id")
    async getUser ( @Param("id") id: string ) : Promise <any> {
        return await this.userServices.getUser(id);
    }

    @Get()
    async getUsers():Promise<any[]| null> {
        return await this.userServices.getUsers();
    }

    @Delete("id")
    async deleteUser( @Param("id") id: string ) : Promise <string> {
        return await this.userServices.deleteUser(id);
    }
}
