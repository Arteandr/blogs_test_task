import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./blog.entity";
import { BlogsController } from './blogs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [BlogsService],
  controllers: [BlogsController]
})
export class BlogsModule {}
