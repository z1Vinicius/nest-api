import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730399962238 implements MigrationInterface {
    name = 'SchemaUpdate1730399962238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" ADD "AVAILABLE" number DEFAULT 0 NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" DROP COLUMN "AVAILABLE"`);
    }

}
