import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UsersService } from "../users/users.service";


const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    private async hashPassword(password: string, salt: string) {
        const hash = await scrypt(password, salt, 32) as Buffer;
        return hash.toString('hex');
    }

    async signup(email: string,
        password: string,
        firstname?: string,
        lastname?: string) {

        // Voir si l'utilisateur existe
        const user = await this.usersService.findByEmail(email);
        if (user)
            throw new BadRequestException('Email already in use');

        // Hasher le mot de passe
        const salt = randomBytes(8).toString('hex');
        const hash = await this.hashPassword(password, salt);
        const result = salt + '.' + hash;

        // Créer un nouvel utilisateur et le sauvegarder
        return this.usersService.createUser({
            email,
            password: result,
            firstname,
            lastname,
        });
    }

    async signin(email: string, password: string) {
        // Trouver l'utilisateur par email
        const user = await this.usersService.findByEmail(email);
        if (!user || !user.isWhitelisted)
            throw new UnauthorizedException();

        // Récupérer le salt et le hash stockés
        const [salt, storedHash] = user.password.split('.');
        const hash = await this.hashPassword(password, salt);

        // Comparer les hashes
        if (hash !== storedHash)
            throw new UnauthorizedException();

        return user;
    }
}