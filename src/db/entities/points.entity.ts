import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Group } from './group.entity';
import { Users } from './user.entity';

@Entity()
export class PointsTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tournament: string;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'player_id' })
  player: Users;

  @Column()
  points: number;

  @Column('decimal', { precision: 5, scale: 2 })
  run_rate: number;
}
