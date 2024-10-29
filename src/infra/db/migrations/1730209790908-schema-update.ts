import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730209790908 implements MigrationInterface {
    name = 'SchemaUpdate1730209790908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" RENAME COLUMN "URL" TO "NAME"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" DROP COLUMN "NAME"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" ADD "NAME" varchar2(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" DROP COLUMN "NAME"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" ADD "NAME" varchar2(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" RENAME COLUMN "NAME" TO "URL"`);
    }

}
