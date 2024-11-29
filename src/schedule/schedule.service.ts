import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/db/entities/schedule.entity';
import { Users } from 'src/db/entities/user.entity';
import { UpdateScheduleByIdReqDTO } from 'src/dto/req/UpdateScheduleByIdReqDTO';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private userRepository: Repository<Users>,
  ) {}
  async getScheduleByPage(offset: number, count: number) {
    return await this.scheduleRepository
      .createQueryBuilder()
      .orderBy('when', 'ASC')
      .skip(offset)
      .take(count)
      .getMany();
  }
  async updateScheduleById(updateScheduleByIdReqDTO: UpdateScheduleByIdReqDTO) {
    //create a tansaction to update the schedule by first getting players and then updating the schedule
    try {
      await this.scheduleRepository.manager.transaction(
        async (transactionalEntityManager) => {
          const playerA = await this.userRepository
            .createQueryBuilder()
            .where('id = :id', { id: updateScheduleByIdReqDTO.playerA })
            .getOne();
          const playerB = await this.userRepository
            .createQueryBuilder()
            .where('id = :id', { id: updateScheduleByIdReqDTO.playerB })
            .getOne();
          if (!playerA || !playerB) {
            throw new Error('Invalid player id');
          }
          await transactionalEntityManager.update(
            Schedule,
            updateScheduleByIdReqDTO.id,
            {
              when: updateScheduleByIdReqDTO.when,
              playerA: playerA,
              playerB: playerB,
            },
          );
        },
      );
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
  async deleteScheduleById(id: number) {
    await this.scheduleRepository.delete(id);
  }
  async createSchedule(when: Date, playerA: number, playerB: number) {
    const playerAEntity = await this.userRepository
      .createQueryBuilder()
      .where('id = :id', { id: playerA })
      .getOne();
    const playerBEntity = await this.userRepository
      .createQueryBuilder()
      .where('id = :id', { id: playerB })
      .getOne();
    if (!playerAEntity || !playerBEntity) {
      throw new Error('Invalid player id');
    }
    const schedule = new Schedule();
    schedule.when = when;
    schedule.playerA = playerAEntity;
    schedule.playerB = playerBEntity;
    await this.scheduleRepository.save(schedule);
  }
  async todaysSchedule() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return await this.scheduleRepository
      .createQueryBuilder()
      .where('when >= :today', { today })
      .orderBy('when', 'ASC')
      .groupBy('when')
      .limit(2)
      .getMany();
  }
}
