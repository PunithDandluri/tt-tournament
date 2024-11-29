import { HttpException, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Users } from 'src/db/entities/user.entity';
import { LoginReqDTO } from 'src/dto/req/LoginReqDTO';
import { GoogleAuthHelper } from 'src/helpers/GoogleAuthHelper';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}
  async login(loginReqDTO: LoginReqDTO): Promise<string> {
    const tempUser = await GoogleAuthHelper(loginReqDTO.token);
    if (!tempUser.valid) {
      log('Invalid token', tempUser);
      throw new HttpException('Invalid token', 401);
    }
    const searchUser = await this.usersRepository
      .createQueryBuilder()
      .where('email_id = :email', { email: tempUser.email })
      .getOne();
    if (searchUser) {
      const token = await this.signToken({
        email: searchUser.email_id,
        role: searchUser.role,
      });
      return token;
    } else {
      const user = new Users();
      user.email_id = tempUser.email;
      user.name = tempUser.name;
      user.profile_pic = tempUser.picture;
      user.role = 'user';
      await this.usersRepository.save(user);
      const token = await this.signToken({
        email: user.email_id,
        role: user.role,
      });
      return token;
    }
  }
  async signToken({
    email,
    role,
  }: {
    email: string;
    role: string;
  }): Promise<string> {
    let payload = { email, scope: role };
    return await this.jwtService.signAsync(payload);
  }
}
