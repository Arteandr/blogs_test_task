import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Сущность описывающая структуру таблицы blogs
 **/
@Entity("blogs")
export class Blog {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  photo: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  @ApiProperty()
  createdAt: Date

  @Column({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  @ApiProperty()
  updatedAt: Date

  @DeleteDateColumn({
    name:"deleted_at"
  })
  @ApiProperty()
  deletedAt?: Date
}