import {MigrationInterface, QueryRunner} from "typeorm";

export class todo1654128523849 implements MigrationInterface {
    name = 'todo1654128523849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5c634c605ff93c4ac0f1be62f0\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user_info\` ADD \`nikname\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_info\` DROP COLUMN \`nikname\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5c634c605ff93c4ac0f1be62f0\` ON \`user\` (\`userInfoId\`)`);
    }

}
