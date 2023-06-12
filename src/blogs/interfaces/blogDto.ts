import { Allow, IsNotEmpty, IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Blog } from "../blog.entity";

/** Класс описывающий поля для создания нового блога (все поля обязательны) */
export class BlogDto {
  @Allow()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @Allow()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @Allow()
  @IsNotEmpty()
  @ApiProperty()
  photo: string;
}

/** Класс описывающий поля для изменения существующего блога (необходимо выбрать хотя бы одно поле) */
export class UpdateBlogDto {
  @Allow()
  @ApiProperty()
  title: string;

  @Allow()
  @ApiProperty()
  description: string;

  @Allow()
  @ApiProperty()
  photo: string;
}

/** Класс необходимый для указания типа запросов с id */
export class IdParams {
  @Allow()
  @IsNumberString()
  @ApiProperty()
  id: number
}

/** Класс описывающий данные которые приходят по ручке получения всех блогов */
export class GetLastDto {
  @ApiProperty({type: [Blog]})
  data: [Blog];

  @ApiProperty()
  total: number;
}

/** Класс описывающий то, на сколько строк в таблице повлиял запрос */
export class AffectedDto {
  @ApiProperty()
  affected: number
}