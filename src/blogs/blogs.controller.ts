import {Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Query} from "@nestjs/common";
import { BlogsService } from "./blogs.service";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import { AffectedDto, BlogDto, GetLastDto, IdParams, UpdateBlogDto } from "./interfaces/blogDto";

@ApiTags("blogs")
@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService
  ) {}

  @Get("/")
  @HttpCode(HttpStatus.OK)
  @ApiQuery({name: "page", type:"string", required: false})
  @ApiQuery({name: "count", type:"string", required: false})
  @ApiQuery({name: "sort", type:"string", required: false})
  @ApiOperation({summary:"Постраничное получение последних N записей (блогов), возможна сортировка по новизне(created_at) и последнему изменению(updated_at)"})
  @ApiResponse({type: GetLastDto, status: HttpStatus.OK, description: "Записи успешно получены"})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: "Указано неверное условие сортировки"})
  async getLast(
    @Query("page") page?: number,
    @Query("count") count?: number,
    @Query("sort") sortBy?: string,
  ) {
    if(sortBy) {
      if (sortBy !== "created_at" && sortBy !== "updated_at")
        throw new HttpException("Выберите коректное условие сортировки", HttpStatus.BAD_REQUEST)
    }

    return await this.blogsService.getLast(page, count, sortBy)
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary:"Получение блога по его id"})
  @ApiResponse({status: HttpStatus.OK, description:"Блог с указаным id успешно найден"})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description:"Блог с указанным id не найден"})
  async getById(@Param() { id }: IdParams) {
    const response = await this.blogsService.getOne(id)
    if (!response) {
      throw new HttpException("Блог не найден", HttpStatus.NOT_FOUND)
    }

    return response
  }

  @Post("/")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary:"Создание нового блога"})
  @ApiResponse({status: HttpStatus.CREATED, description: "Блог успешно создан"})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: "Заполнены не все поля для создания блога"})
  async create(@Body() blogDto: BlogDto) {
    return await this.blogsService.create(blogDto)
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary:"\"Мягкое\" удаление блога по его id"})
  @ApiResponse({type: AffectedDto, status: HttpStatus.OK, description: "Блог с указанным id успешно (мягко) удален"})
  async delete(@Param() { id }: IdParams) {
    const {affected} =  await this.blogsService.softDelete(id)
    return {
      affected
    }
  }

  @Patch("/:id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary:"Изменения указаных полей в блоге по его id"})
  @ApiResponse({type: AffectedDto, status: HttpStatus.OK, description: "Блог с указаным id успешно изменен"})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description:"Не указаны поля для изменения"})
  async update(@Param() { id }: IdParams, @Body() blogDto: UpdateBlogDto) {
    if (Object.getOwnPropertyNames(blogDto).length === 0) {
      throw new HttpException("Укажите хотябы одно поле для изменения", HttpStatus.BAD_REQUEST)
    }

    const {affected} = await this.blogsService.update(id, blogDto)
    return {
      affected
    }
  }
}
