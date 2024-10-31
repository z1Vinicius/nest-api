import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730383432406 implements MigrationInterface {
    name = 'SchemaUpdate1730383432406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ORDERS" ADD "userId" varchar2(36)`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS" ADD CONSTRAINT "FK_6f13f5457abdb650e39a52533f6" FOREIGN KEY ("userId") REFERENCES "TB_USERS" ("CD_USER")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_ORDERS" DROP CONSTRAINT "FK_6f13f5457abdb650e39a52533f6"`);
        await queryRunner.query(`ALTER TABLE "TB_ORDERS" DROP COLUMN "userId"`);
    }

}
