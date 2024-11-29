import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateScheduleTable1727701164775 implements MigrationInterface {
    name = 'UpdateScheduleTable1727701164775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` CHANGE \`datetime\` \`when\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`schedule\` CHANGE \`when\` \`when\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` CHANGE \`when\` \`when\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`schedule\` CHANGE \`when\` \`datetime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
