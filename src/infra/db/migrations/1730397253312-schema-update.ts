import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730397253312 implements MigrationInterface {
    name = 'SchemaUpdate1730397253312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" DROP CONSTRAINT "FK_0d35a6f0626727499e528c763cc"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" RENAME COLUMN "CD_PRODUCT" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" ADD CONSTRAINT "FK_84add6e11d78eb869cf548d2b7a" FOREIGN KEY ("productId") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" DROP CONSTRAINT "FK_84add6e11d78eb869cf548d2b7a"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" RENAME COLUMN "productId" TO "CD_PRODUCT"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" ADD CONSTRAINT "FK_0d35a6f0626727499e528c763cc" FOREIGN KEY ("CD_PRODUCT") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
    }

}
