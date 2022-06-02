import {MigrationInterface, QueryRunner} from "typeorm";

export class todo1654128579031 implements MigrationInterface {
    name = 'todo1654128579031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_info\` DROP COLUMN \`nikname\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_info\` ADD \`nikname\` varchar(255) NOT NULL`);
    }

}
