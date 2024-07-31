import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedUserAttributes1722394810212 implements MigrationInterface {
    name = 'RemovedUserAttributes1722394810212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cpf"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "cpf" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf")`);
    }

}
