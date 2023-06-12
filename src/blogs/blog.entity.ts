import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  photo: string;

  @Column({
    type: "timestamp",
    default: null
  })
  deleted: Date

  @Column({
    type: "timestamp",
    default: Date.now()
  })
  createdAt: Date

  @Column({
    type: "timestamp",
    default: Date.now()
  })
  updatedAt: Date
}