import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createJWT(loginDto: LoginDto) {
    const data = { user: { name: 'fede', apellido: 'Huenteman' } };
    const token = this.jwtService.sign(data, { expiresIn: 20 });

    return {
      token: token,
    };
  }

  async verifyToken(token: string) {
    try {
      await this.jwtService.verify(token);
      const decoded = await this.jwtService.decode(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
