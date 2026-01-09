import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("/signup")
    signup(@Body() body) {
        const { email, password, firstName, lastName } = body;
        return this.authService.signup(email, password, firstName, lastName);
    }

    @Post("/login")
    login(@Body() body) {
        return this.authService.signin(body.email, body.password);
    }
}