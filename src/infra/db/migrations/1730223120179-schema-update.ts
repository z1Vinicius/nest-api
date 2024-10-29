import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730223120179 implements MigrationInterface {
    name = 'SchemaUpdate1730223120179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" ADD "productId" varchar2(36)`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" ADD "productId" varchar2(36)`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_IMAGES" ADD "productId" varchar2(36)`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" ADD CONSTRAINT "FK_7e3c5984f6205f30525534ef384" FOREIGN KEY ("productId") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" ADD CONSTRAINT "FK_3b083fe890e5e8d965a44a24045" FOREIGN KEY ("productId") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_IMAGES" ADD CONSTRAINT "FK_94eadbc40dbd2fdd8eea9f67ca8" FOREIGN KEY ("productId") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_IMAGES" DROP CONSTRAINT "FK_94eadbc40dbd2fdd8eea9f67ca8"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" DROP CONSTRAINT "FK_3b083fe890e5e8d965a44a24045"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" DROP CONSTRAINT "FK_7e3c5984f6205f30525534ef384"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_IMAGES" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" DROP COLUMN "productId"`);
    }

}
