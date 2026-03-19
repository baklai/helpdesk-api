import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import DataLoader from 'dataloader';
import type { PaginateModel, PaginateResult } from 'mongoose';
import { Document, Model, Types, UpdateQuery } from 'mongoose';

import { PaginateArgs } from 'src/common/dto/paginate.args';
import { normalizeEnumFilters } from 'src/common/utils/enum-normalizer';

const ALLOWED_OPERATORS = new Set([
  '$and',
  '$or',
  '$in',
  '$nin',
  '$eq',
  '$ne',
  '$gt',
  '$gte',
  '$lt',
  '$lte',
  '$regex',
  '$options',
  '$exists',
  '$type',
  '$not'
]);

type FilterValue = string | number | boolean | null | FilterObject | FilterValue[];
type FilterObject = { [key: string]: FilterValue };

export abstract class BaseCrudService<
  TDocument extends Document,
  TEntity,
  TCreateInput,
  TUpdateInput
> {
  private readonly loader: DataLoader<string, TEntity | null>;

  protected constructor(protected readonly model: Model<TDocument> | PaginateModel<TDocument>) {
    this.loader = new DataLoader<string, TEntity | null>(
      async ids => {
        if (!ids.length) return [];
        const results = await this.findAllByIds([...ids]);
        const map = new Map<string, TEntity>(
          results.map(item => [String((item as any).id ?? (item as any)._id), item])
        );
        return ids.map(id => map.get(id) ?? null);
      },
      { cache: false }
    );
  }

  /**
   * Захищає від NoSQL-ін'єкцій: забороняє небезпечні MongoDB-оператори,
   * обробляє масиви та нормалізує GraphQL UPPERCASE enum-значення → DB lowercase.
   *
   * Порядок обробки:
   * 1. normalizeEnumFilters — перетворює enum-ключі у DB-значення
   * 2. sanitize             — рекурсивно видаляє заборонені оператори
   */
  private sanitizeFilters(filters: Record<string, unknown>): FilterObject {
    const sanitize = (obj: FilterValue): FilterValue => {
      if (Array.isArray(obj)) {
        return obj.map(sanitize);
      }

      if (typeof obj === 'object' && obj !== null) {
        return Object.fromEntries(
          Object.entries(obj as FilterObject)
            .filter(([k]) => !k.startsWith('$') || ALLOWED_OPERATORS.has(k))
            .map(([k, v]) => [k, sanitize(v)])
        );
      }

      return obj;
    };

    return sanitize(normalizeEnumFilters(filters as FilterObject)) as FilterObject;
  }

  async load(id: Types.ObjectId | string | null | undefined): Promise<TEntity | null> {
    if (!id) return null;
    return this.loader.load(id.toString());
  }

  async create(input: TCreateInput): Promise<TEntity> {
    try {
      const result = await this.model.create(input as Partial<TDocument>);
      return result.toObject() as unknown as TEntity;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestException('Запис з такими даними вже існує');
      }
      throw new UnprocessableEntityException('Не вдалося створити запис');
    }
  }

  async findAll(): Promise<TEntity[]> {
    const result = await this.model.find().exec();
    return result as unknown as TEntity[];
  }

  async findAllByIds(ids: string[]): Promise<TEntity[]> {
    if (!ids.length) return [];
    const result = await this.model.find({ _id: { $in: ids } }).exec();
    return result as unknown as TEntity[];
  }

  async findAllPaginated(args: PaginateArgs): Promise<PaginateResult<TEntity>> {
    const { offset = 0, limit = 5, sort = {}, filters = {} } = args;

    const result = await (this.model as PaginateModel<TDocument>).paginate(
      { ...this.sanitizeFilters(filters) },
      {
        sort,
        offset,
        limit,
        lean: false,
        allowDiskUse: true
      }
    );

    return result as unknown as PaginateResult<TEntity>;
  }

  async findOneById(id: string): Promise<TEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    const result = await this.model.findById(id).exec();

    if (!result) {
      throw new NotFoundException('Запис не знайдено');
    }

    return result as unknown as TEntity;
  }

  async updateOneById(id: string, input: TUpdateInput): Promise<TEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    try {
      const result = await this.model
        .findByIdAndUpdate(id, { $set: input } as UpdateQuery<TDocument>, {
          returnDocument: 'after'
        })
        .exec();

      if (!result) {
        throw new NotFoundException('Запис не знайдено');
      }

      return result as unknown as TEntity;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      if (error.code === 11000) {
        throw new BadRequestException('Запис з такими даними вже існує');
      }
      throw new UnprocessableEntityException('Не вдалося оновити запис');
    }
  }

  async removeOneById(id: string): Promise<TEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    const result = await this.model.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('Запис не знайдено');
    }

    return result as unknown as TEntity;
  }
}
