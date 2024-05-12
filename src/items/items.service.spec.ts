import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  let itemsRepository: Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    itemsRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an item', async () => {
    const item = await service.create({
      name: 'Item name',
      public: false,
      listing: {
        description: 'Item description',
      },
      tags: [
        {
          name: 'tag1',
        },
      ],
    });

    expect(item.name).toEqual('Item name');
  });

  it('should find all items', async () => {
    await service.findAll();

    expect(itemsRepository.find).toHaveBeenCalled();
  });
});
