import { Allow, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBlogDto {
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

export abstract class UpdateBlogDto {
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

export class IdParams {
  @Allow()
  @IsNumberString()
  @ApiProperty()
  id: number
}