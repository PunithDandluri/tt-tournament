import { Controller, Get, Param } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private scheduleService: ScheduleService,
  ) {}
  @Get()
  async getSchedule(@Param('page') page: number) {
    return 'Schedule';
  }
}

