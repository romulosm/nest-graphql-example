import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterBirthDateToTimestamptz1750184731232
  implements MigrationInterface
{
  name = 'AlterBirthDateToTimestamptz1750184731232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "birthDate"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "birthDate" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "birthDate"`);
    await queryRunner.query(`ALTER TABLE "customer" ADD "birthDate" date`);
  }
}
