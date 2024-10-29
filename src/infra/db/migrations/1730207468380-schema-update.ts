import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730207468380 implements MigrationInterface {
    name = 'SchemaUpdate1730207468380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TB_USER" ("CD_USER" varchar2(36), "DE_USER" varchar2(50) NOT NULL, "EMAIL" varchar2(255) NOT NULL, "PASSWORD" varchar2(255) NOT NULL, "ACTIVE" number DEFAULT 1 NOT NULL, "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "DELETED_AT" timestamp, CONSTRAINT "PK_e34d02d9ef61bf58fa6d0072baa" PRIMARY KEY ("CD_USER"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "TB_USER"`);
    }

}
