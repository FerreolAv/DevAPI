import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/users.entity";
import { UsersModule } from "./users/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Books } from "./books/books.entity";
import { AuthModule } from "./auth/auth.module";
import { UsersService } from "./users/users.service";


@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db.sqlite',
        entities: [User, Books],
        synchronize: true,
    }),
    UsersModule,
    AuthModule],

    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}