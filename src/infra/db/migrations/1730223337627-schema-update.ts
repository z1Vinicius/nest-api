import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730223337627 implements MigrationInterface {
    name = 'SchemaUpdate1730223337627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" ADD "categoryId" number`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" ADD CONSTRAINT "FK_963942ba8211e285b7530870688" FOREIGN KEY ("categoryId") REFERENCES "TB_PRODUCT_CATEGORIES" ("CD_PRODUCT_CATEGORY")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" DROP CONSTRAINT "FK_963942ba8211e285b7530870688"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" DROP COLUMN "categoryId"`);
    }

}
