import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730220461089 implements MigrationInterface {
    name = 'SchemaUpdate1730220461089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" DROP CONSTRAINT "FK_dbf94bc350ecf3884371020a630"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" DROP CONSTRAINT "FK_d27519df6aebc222a60d6c8324c"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" DROP COLUMN "imagesId"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" DROP COLUMN "detailsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" ADD "detailsId" number`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" ADD "imagesId" number`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" ADD CONSTRAINT "FK_d27519df6aebc222a60d6c8324c" FOREIGN KEY ("imagesId") REFERENCES "TB_PRODUCT_IMAGES" ("CD_PRODUCT_IMAGE")`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCTS" ADD CONSTRAINT "FK_dbf94bc350ecf3884371020a630" FOREIGN KEY ("detailsId") REFERENCES "TB_PRODUCT_DETAILS" ("CD_PRODUCT_DETAIL")`);
    }

}
