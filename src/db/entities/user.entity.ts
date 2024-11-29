import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  profile_pic: string;

  @Column({ unique: true })
  email_id: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
    nullable: false,
  })
  role: string;
}
