import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730223172268 implements MigrationInterface {
    name = 'SchemaUpdate1730223172268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" DROP CONSTRAINT "FK_7e3c5984f6205f30525534ef384"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" DROP COLUMN "productId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" ADD "productId" varchar2(36)`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" ADD CONSTRAINT "FK_7e3c5984f6205f30525534ef384" FOREIGN KEY ("productId") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
    }

}
