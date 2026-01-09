import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    createUser(data: {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}) {
        const user = this.repo.create({email: data.email, password: data.password, firstname: data.firstname, lastname: data.lastname});
        return this.repo.save(user);
    }
    findAll() {
        return this.repo.find();
    }
    findByEmail(email: string) {
        return this.repo.findOneBy({ email });
    }
    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }
    whitelistUser(id: number) {
        return this.repo.update(id, { isWhitelisted: true });
    }
}