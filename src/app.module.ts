import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './db/entities/user.entity';
import { Group } from './db/entities/group.entity';
import { UserGroup } from './db/entities/user_group.entity';
import { Schedule } from './db/entities/schedule.entity';
import { PointsTable } from './db/entities/points.entity';
import { ScheduleModule } from './schedule/schedule.module';
import { ReddisModule } from './reddis/reddis.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'username',
      password: 'password',
      database: 'tabletennis',
      entities: [Users,Group,UserGroup,Schedule,PointsTable], // Update path to match correctly
      migrations: [__dirname + '/src/db/migrations/*{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    ScheduleModule,
    ReddisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
