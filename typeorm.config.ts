import { Group } from 'src/db/entities/group.entity';
import { PointsTable } from 'src/db/entities/points.entity';
import { Schedule } from 'src/db/entities/schedule.entity';
import { Users } from 'src/db/entities/user.entity';
import { UserGroup } from 'src/db/entities/user_group.entity';
import { DataSource } from 'typeorm';
console.log(__dirname + '/../**/');
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'username',
  password: 'password',
  database: 'tabletennis',
  entities: [Users, Group, UserGroup, Schedule, PointsTable],
  migrations: [__dirname + '/src/db/migrations/*{.ts,.js}'],
  synchronize: false,
});
