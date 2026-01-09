import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "src/auth/auth.service";
import { User } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, AuthService],
    exports: [UsersService]
})
export class UsersModule {}