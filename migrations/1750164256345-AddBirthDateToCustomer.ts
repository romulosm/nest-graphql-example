import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBirthDateToCustomer1750164256345 implements MigrationInterface {
  name = 'AddBirthDateToCustomer1750164256345';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" ADD "birthDate" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "birthDate"`);
  }
}
