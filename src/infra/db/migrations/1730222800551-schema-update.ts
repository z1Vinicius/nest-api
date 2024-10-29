import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730222800551 implements MigrationInterface {
    name = 'SchemaUpdate1730222800551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" DROP CONSTRAINT "FK_62fa2ee2e8e8671cfca82182fb8"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" DROP CONSTRAINT "UQ_62fa2ee2e8e8671cfca82182fb8"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" DROP COLUMN "CD_PRODUCT_CATEGORY"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" ADD "CD_PRODUCT_CATEGORY" number`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" ADD CONSTRAINT "UQ_62fa2ee2e8e8671cfca82182fb8" UNIQUE ("CD_PRODUCT_CATEGORY")`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" ADD CONSTRAINT "FK_62fa2ee2e8e8671cfca82182fb8" FOREIGN KEY ("CD_PRODUCT_CATEGORY") REFERENCES "TB_PRODUCT_CATEGORIES" ("CD_PRODUCT_CATEGORY")`);
    }

}
