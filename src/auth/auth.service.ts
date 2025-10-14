import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users = [
    {
      id: 1,
      email: 'test@test.com',
      password: bcrypt.hashSync('123456', 10),
      name: 'Test User',
    },
  ];

  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = this.users.find(u => u.email === email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { user, token };
  }
}
