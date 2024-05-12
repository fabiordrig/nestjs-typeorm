import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({ ...createItemDto.listing, rating: 0 });
    const item = new Item({ ...createItemDto, comments: [], listing });
    await this.entityManager.save(item);

    return item;
  }

  async findAll() {
    return this.itemRepository.find();
  }

  async findOne(id: string) {
    return this.itemRepository.findOne({
      where: { id },
      relations: ['listing', 'comments'],
    });
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);

    item.public = updateItemDto.public;

    await this.entityManager.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.entityManager.remove(item);
  }
}
