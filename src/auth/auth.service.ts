import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signup(dto: AuthDto) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(dto.password, salt);

        const user = await this.usersService.createUser(dto.email, hash);

        return user;
    }

    async signin(dto: AuthDto) {
        // 1. Find the user by email
        const user = await this.usersService.findUserByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Credentials incorrect');
        }

        // 2. Compare the provided password with the stored hash
        const passwordsMatch = await bcrypt.compare(dto.password, user.hash);
        if (!passwordsMatch) {
            throw new UnauthorizedException('Credentials incorrect');
        }

        // 3. If passwords match, generate and return the JWT
        const payload = { sub: user._id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);

        return { access_token: accessToken };
    }
}
