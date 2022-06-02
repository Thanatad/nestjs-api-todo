import {MigrationInterface, QueryRunner} from "typeorm";

export class todo1654128198572 implements MigrationInterface {
    name = 'todo1654128198572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_info\` (\`id\` int NOT NULL AUTO_INCREMENT, \`pet_name\` varchar(255) NULL, \`photo\` varchar(255) NULL, \`modified_photo\` varchar(255) NULL, \`address\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`salt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hashedRefreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userInfoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_5c634c605ff93c4ac0f1be62f0\` (\`userInfoId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5c634c605ff93c4ac0f1be62f0\` ON \`user\` (\`userInfoId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_5c634c605ff93c4ac0f1be62f00\` FOREIGN KEY (\`userInfoId\`) REFERENCES \`user_info\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_5c634c605ff93c4ac0f1be62f00\``);
        await queryRunner.query(`DROP INDEX \`REL_5c634c605ff93c4ac0f1be62f0\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_5c634c605ff93c4ac0f1be62f0\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userInfoId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hashedRefreshToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`salt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`user_info\``);
    }

}
