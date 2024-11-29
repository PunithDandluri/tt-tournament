import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Group } from './group.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'player_a_id' })
  playerA: Users;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'player_b_id' })
  playerB: Users;

  @Column('simple-json', { nullable: true })
  results: { set1: number; set2: number; set3: number; }[];

  @ManyToOne(() => Users, { nullable: true })
  @JoinColumn({ name: 'winner_player_id' })
  winnerPlayer: Users;

  @Column()
  match_status: string;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;
@Column()
  when: Date;
}
