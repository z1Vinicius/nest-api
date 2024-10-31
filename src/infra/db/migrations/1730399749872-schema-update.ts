import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730399749872 implements MigrationInterface {
    name = 'SchemaUpdate1730399749872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ORDERS" DROP CONSTRAINT "FK_42529510feea380d8ac47d042d7"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS" DROP COLUMN "orderItemsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ORDERS" ADD "orderItemsId" varchar2(36)`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS" ADD CONSTRAINT "FK_42529510feea380d8ac47d042d7" FOREIGN KEY ("orderItemsId") REFERENCES "TB_ORDERS_ITEMS" ("CD_ORDER_ITEM")`);
    }

}
