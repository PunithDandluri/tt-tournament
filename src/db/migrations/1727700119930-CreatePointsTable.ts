import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePointsTable1727700119930 implements MigrationInterface {
    name = 'CreatePointsTable1727700119930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`points_table\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tournament\` varchar(255) NOT NULL, \`points\` int NOT NULL, \`run_rate\` decimal(5,2) NOT NULL, \`group_id\` int NULL, \`player_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`results\` text NULL, \`match_status\` varchar(255) NOT NULL, \`datetime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`player_a_id\` int NULL, \`player_b_id\` int NULL, \`winner_player_id\` int NULL, \`group_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`player_id\` int NULL, \`group_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`points_table\` ADD CONSTRAINT \`FK_73f7fbe516938872016f458553a\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`points_table\` ADD CONSTRAINT \`FK_dfb688b9863f08a2a23c9bdbe30\` FOREIGN KEY (\`player_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_2e2d292d21484f54238b5d20739\` FOREIGN KEY (\`player_a_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_ec351afef7e0eaf3dee5f394ea8\` FOREIGN KEY (\`player_b_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_0707a3335c300103105d7914bd8\` FOREIGN KEY (\`winner_player_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_b9579e4a3a46e2afdae0b757048\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_5fec5cdeaeb78363bf7aa46aa65\` FOREIGN KEY (\`player_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_bb9982562cca83afb76c0ddc0d6\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_bb9982562cca83afb76c0ddc0d6\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_5fec5cdeaeb78363bf7aa46aa65\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_b9579e4a3a46e2afdae0b757048\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_0707a3335c300103105d7914bd8\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_ec351afef7e0eaf3dee5f394ea8\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_2e2d292d21484f54238b5d20739\``);
        await queryRunner.query(`ALTER TABLE \`points_table\` DROP FOREIGN KEY \`FK_dfb688b9863f08a2a23c9bdbe30\``);
        await queryRunner.query(`ALTER TABLE \`points_table\` DROP FOREIGN KEY \`FK_73f7fbe516938872016f458553a\``);
        await queryRunner.query(`DROP TABLE \`user_group\``);
        await queryRunner.query(`DROP TABLE \`schedule\``);
        await queryRunner.query(`DROP TABLE \`points_table\``);
        await queryRunner.query(`DROP TABLE \`group\``);
    }

}
