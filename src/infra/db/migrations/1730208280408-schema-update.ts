import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730208280408 implements MigrationInterface {
    name = 'SchemaUpdate1730208280408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TB_USERS" ("CD_USER" varchar2(36), "DE_USER" varchar2(50) NOT NULL, "EMAIL" varchar2(255) NOT NULL, "PASSWORD" varchar2(255) NOT NULL, "ACTIVE" number DEFAULT 1 NOT NULL, "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "DELETED_AT" timestamp, CONSTRAINT "PK_52659308a31f3a45b28311c1c70" PRIMARY KEY ("CD_USER"))`);
        await queryRunner.query(`CREATE TABLE "TB_PRODUCTS" ("CD_PRODUCT" varchar2(36), "NAME" varchar2(255) NOT NULL, "PRODUCT_PRICE" number DEFAULT 0 NOT NULL, "PRODUCT_DE" varchar2(255) NOT NULL, "ACTIVE" number DEFAULT 1 NOT NULL, "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "DELETED_AT" timestamp, CONSTRAINT "PK_d7167dc629f6aa69081fa20bfc3" PRIMARY KEY ("CD_PRODUCT"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "TB_PRODUCTS"`);
        await queryRunner.query(`DROP TABLE "TB_USERS"`);
    }

}
