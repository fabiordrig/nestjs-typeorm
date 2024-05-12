import { Logger } from '@nestjs/common';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { Item } from './entities/item.entity';

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  private readonly logger = new Logger(ItemSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Item;
  }

  beforeInsert(event) {
    this.logger.log(`BEFORE ITEM INSERTED: ${JSON.stringify(event.entity)}`);
  }

  afterInsert(event) {
    this.logger.log(`AFTER ITEM INSERTED: ${JSON.stringify(event.entity)}`);
  }

  beforeUpdate(event) {
    this.logger.log(`BEFORE ITEM UPDATED: ${JSON.stringify(event.entity)}`);
  }

  afterUpdate(event) {
    this.logger.log(`AFTER ITEM UPDATED: ${JSON.stringify(event.entity)}`);
  }
}
