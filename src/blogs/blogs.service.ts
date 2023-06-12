import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Blog } from "./blog.entity";
import { IsNull, Repository } from "typeorm";
import { BlogDto, UpdateBlogDto } from "./interfaces/blogDto";

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>
    ) {}

  async getLast(p?: number, count?: number, orderBy?: string) {
    // Делаем дефолтные условия на случай если в запросе ничего не указано
    const take = count < 1 || !count ? 10 : count // 10 записей
    const page = p < 1 || !p ? 1 : p              // 1 страница
    const skip = (page-1) * take

    const query = this.blogsRepository.createQueryBuilder()
    // Если указано поле сортировки, устанавливаем его, иначе сортируем по id
    if(orderBy)
      query.addOrderBy(orderBy, "DESC")
    else
      query.addOrderBy("id", "ASC")

    const [data, total] = await query.take(take)
      .skip(skip)
      .getManyAndCount()

    return {
      data,
      total,
    }
  }

  getOne(id: number) {
    return this.blogsRepository.createQueryBuilder()
      .where({ id })
      .getOne()
  }

  /** При "мягком" удалении запись не удаляется физически, а лишь помечается соответствующим флагом - timestamp-ом */
  softDelete(id: number) {
    return this.blogsRepository.createQueryBuilder()
      .update()
      .set({ deletedAt: () => "CURRENT_TIMESTAMP" })
      .where({
        deletedAt: IsNull(),
      })
      .andWhere({ id })
      .execute()
  }

  create(blogDto: BlogDto) {
    return this.blogsRepository.save(blogDto)
  }

  update(id: number, blogDto: UpdateBlogDto) {
    return this.blogsRepository.createQueryBuilder()
      .update()
      .set({ ...blogDto, updatedAt: () => "CURRENT_TIMESTAMP"})
      .where({
        deletedAt: IsNull()
      })
      .andWhere({id})
      .execute()
  }
}