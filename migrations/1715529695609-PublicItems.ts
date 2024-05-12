import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PublicItems1715529695609 implements MigrationInterface {
  private readonly logger = new Logger(PublicItems1715529695609.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Up');
    await queryRunner.query(`UPDATE item SET public = true`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Down');
    await queryRunner.query(`UPDATE item SET public = false`);
  }
}
