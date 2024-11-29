import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]), // Register UsersRepository for use in AuthService
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        '1f9b52e6a4f8ba64fab51d35c9906bf9655643896582eb68ceac8923ef0febe7',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
