/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MigrationInterface, QueryRunner } from 'typeorm';

export function SetRole(role = 'schema_assets_management_api') {
  return function (
    _target: MigrationInterface,
    _key: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (queryRunner: QueryRunner) {
      await queryRunner.query(`SET ROLE ${role};`);
      await originalMethod.apply(this, [queryRunner]);
      await queryRunner.query(`RESET ROLE;`);
    };
  };
}
