import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730380614233 implements MigrationInterface {
    name = 'SchemaUpdate1730380614233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TB_ORDERS_ITEMS" ("CD_ORDER_ITEM" varchar2(36), "QUANTITY" number DEFAULT 0 NOT NULL, "TOTAL_PRICE" number DEFAULT 0 NOT NULL, "orderId" varchar2(36), "CD_PRODUCT" varchar2(36), CONSTRAINT "REL_0d35a6f0626727499e528c763c" UNIQUE ("CD_PRODUCT"), CONSTRAINT "PK_ac1fac070adbc9829550dda834f" PRIMARY KEY ("CD_ORDER_ITEM"))`);
        await queryRunner.query(`CREATE TABLE "TB_ORDERS" ("CD_ORDER" varchar2(36), "STATUS" varchar2(255) DEFAULT 'pending' NOT NULL, "TOTAL" number DEFAULT 0 NOT NULL, "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "DELETED_AT" timestamp, "orderItemsId" varchar2(36), CONSTRAINT "PK_ecb58c7ab9e8877fe60544a1f35" PRIMARY KEY ("CD_ORDER"))`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" ADD CONSTRAINT "FK_031f40476d66aaf359786a71a37" FOREIGN KEY ("orderId") REFERENCES "TB_ORDERS" ("CD_ORDER")`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" ADD CONSTRAINT "FK_0d35a6f0626727499e528c763cc" FOREIGN KEY ("CD_PRODUCT") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS" ADD CONSTRAINT "FK_42529510feea380d8ac47d042d7" FOREIGN KEY ("orderItemsId") REFERENCES "TB_ORDERS_ITEMS" ("CD_ORDER_ITEM")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ORDERS" DROP CONSTRAINT "FK_42529510feea380d8ac47d042d7"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" DROP CONSTRAINT "FK_0d35a6f0626727499e528c763cc"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS_ITEMS" DROP CONSTRAINT "FK_031f40476d66aaf359786a71a37"`);
        await queryRunner.query(`DROP TABLE "TB_ORDERS"`);
        await queryRunner.query(`DROP TABLE "TB_ORDERS_ITEMS"`);
    }

}
