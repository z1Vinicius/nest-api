import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1730221023008 implements MigrationInterface {
    name = 'SchemaUpdate1730221023008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_IMAGES" DROP CONSTRAINT "FK_94eadbc40dbd2fdd8eea9f67ca8"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" DROP CONSTRAINT "FK_7e3c5984f6205f30525534ef384"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" DROP CONSTRAINT "FK_3b083fe890e5e8d965a44a24045"`);
        await queryRunner.query(`CREATE TABLE "tb_pro_ima_tb_pro_ima" ("tBPRODUCTSCDPRODUCT" varchar2(36) NOT NULL, "tBPRODUCTIMAGESCDPRODUCTIMAGE" number NOT NULL, CONSTRAINT "PK_06f99ed407dd7a82e4e1b67ec9a" PRIMARY KEY ("tBPRODUCTSCDPRODUCT", "tBPRODUCTIMAGESCDPRODUCTIMAGE"))`);
        await queryRunner.query(`CREATE INDEX "IDX_07fe5a7548d393f80eea24ec13" ON "tb_pro_ima_tb_pro_ima" ("tBPRODUCTSCDPRODUCT")`);
        await queryRunner.query(`CREATE INDEX "IDX_e9df9c0c654eca3a037f20d8de" ON "tb_pro_ima_tb_pro_ima" ("tBPRODUCTIMAGESCDPRODUCTIMAGE")`);
        await queryRunner.query(`CREATE TABLE "tb_pro_det_tb_pro_det" ("tBPRODUCTSCDPRODUCT" varchar2(36) NOT NULL, "tBPRODUCTDETAILSCDPRODUCTDETAIL" number NOT NULL, CONSTRAINT "PK_be36b084d58f36be023c3b9c93d" PRIMARY KEY ("tBPRODUCTSCDPRODUCT", "tBPRODUCTDETAILSCDPRODUCTDETAIL"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3230b26664cd9b081939f8196d" ON "tb_pro_det_tb_pro_det" ("tBPRODUCTSCDPRODUCT")`);
        await queryRunner.query(`CREATE INDEX "IDX_6d74ef6d60ea709fa35d1cb60e" ON "tb_pro_det_tb_pro_det" ("tBPRODUCTDETAILSCDPRODUCTDETAIL")`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_IMAGES" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "tb_pro_ima_tb_pro_ima" ADD CONSTRAINT "FK_07fe5a7548d393f80eea24ec136" FOREIGN KEY ("tBPRODUCTSCDPRODUCT") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_pro_ima_tb_pro_ima" ADD CONSTRAINT "FK_e9df9c0c654eca3a037f20d8de5" FOREIGN KEY ("tBPRODUCTIMAGESCDPRODUCTIMAGE") REFERENCES "TB_PRODUCT_IMAGES" ("CD_PRODUCT_IMAGE") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_pro_det_tb_pro_det" ADD CONSTRAINT "FK_3230b26664cd9b081939f8196df" FOREIGN KEY ("tBPRODUCTSCDPRODUCT") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_pro_det_tb_pro_det" ADD CONSTRAINT "FK_6d74ef6d60ea709fa35d1cb60e6" FOREIGN KEY ("tBPRODUCTDETAILSCDPRODUCTDETAIL") REFERENCES "TB_PRODUCT_DETAILS" ("CD_PRODUCT_DETAIL") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_pro_det_tb_pro_det" DROP CONSTRAINT "FK_6d74ef6d60ea709fa35d1cb60e6"`);
        await queryRunner.query(`ALTER TABLE "tb_pro_det_tb_pro_det" DROP CONSTRAINT "FK_3230b26664cd9b081939f8196df"`);
        await queryRunner.query(`ALTER TABLE "tb_pro_ima_tb_pro_ima" DROP CONSTRAINT "FK_e9df9c0c654eca3a037f20d8de5"`);
        await queryRunner.query(`ALTER TABLE "tb_pro_ima_tb_pro_ima" DROP CONSTRAINT "FK_07fe5a7548d393f80eea24ec136"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" ADD "productId" varchar2(36)`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" ADD "productId" varchar2(36)`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_IMAGES" ADD "productId" varchar2(36)`);
        await queryRunner.query(`DROP INDEX "IDX_6d74ef6d60ea709fa35d1cb60e"`);
        await queryRunner.query(`DROP INDEX "IDX_3230b26664cd9b081939f8196d"`);
        await queryRunner.query(`DROP TABLE "tb_pro_det_tb_pro_det"`);
        await queryRunner.query(`DROP INDEX "IDX_e9df9c0c654eca3a037f20d8de"`);
        await queryRunner.query(`DROP INDEX "IDX_07fe5a7548d393f80eea24ec13"`);
        await queryRunner.query(`DROP TABLE "tb_pro_ima_tb_pro_ima"`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_DETAILS" ADD CONSTRAINT "FK_3b083fe890e5e8d965a44a24045" FOREIGN KEY ("productId") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_CATEGORIES" ADD CONSTRAINT "FK_7e3c5984f6205f30525534ef384" FOREIGN KEY ("productId") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
        await queryRunner.query(`ALTER TABLE "TB_PRODUCT_IMAGES" ADD CONSTRAINT "FK_94eadbc40dbd2fdd8eea9f67ca8" FOREIGN KEY ("productId") REFERENCES "TB_PRODUCTS" ("CD_PRODUCT")`);
    }

}
