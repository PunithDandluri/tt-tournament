import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from 'src/db/entities/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Users])],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
