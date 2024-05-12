import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid',
  })
  id: string;

  deletedBy: string;

  deletedAt: Date;

  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
