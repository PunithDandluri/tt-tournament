import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1727687410258 implements MigrationInterface {
    name = 'CreateUserTable1727687410258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`profile_pic\` varchar(255) NOT NULL, \`email_id\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', UNIQUE INDEX \`IDX_e752aee509d8f8118c6e5b1d8c\` (\`email_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e752aee509d8f8118c6e5b1d8c\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
