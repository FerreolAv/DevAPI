import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-signup.dto";
import { UsersService } from "./users.service";


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Patch(':id/whitelist')
    whitelistUser(@Param('id') id: string) {
        return this.usersService.whitelistUser(+id);
    }
}
