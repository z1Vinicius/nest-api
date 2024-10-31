import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730396850425 implements MigrationInterface {
    name = 'SchemaUpdate1730396850425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" DROP CONSTRAINT "FK_031f40476d66aaf359786a71a37"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" DROP CONSTRAINT "FK_0d35a6f0626727499e528c763cc"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" DROP CONSTRAINT "REL_0d35a6f0626727499e528c763c"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" ADD CONSTRAINT "FK_031f40476d66aaf359786a71a37" FOREIGN KEY ("orderId") REFERENCES "TB_ORDERS" ("CD_ORDER") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" ADD CONSTRAINT "FK_0d35a6f0626727499e528c763cc" FOREIGN KEY ("CD_PRODUCT") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" DROP CONSTRAINT "FK_0d35a6f0626727499e528c763cc"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" DROP CONSTRAINT "FK_031f40476d66aaf359786a71a37"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" ADD CONSTRAINT "REL_0d35a6f0626727499e528c763c" UNIQUE ("CD_PRODUCT")`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" ADD CONSTRAINT "FK_0d35a6f0626727499e528c763cc" FOREIGN KEY ("CD_PRODUCT") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" ADD CONSTRAINT "FK_031f40476d66aaf359786a71a37" FOREIGN KEY ("orderId") REFERENCES "TB_ORDERS" ("CD_ORDER")`);
    }

}
