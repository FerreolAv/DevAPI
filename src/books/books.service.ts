import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Books } from "./books.entity";


@Injectable()
export class BooksService {
    constructor(@InjectRepository(Books) private repo: Repository<Books>) {}

    findAll(): Promise<Books[]> {
        return this.repo.find();
    }

    findOne(id: number): Promise<Books | null> {
        return this.repo.findOneBy({ id });
    }
}