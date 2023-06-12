import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "admin",
      password: "admin",
      database: "project",
      entities: [],
      synchronize: true,
    }),
    BlogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
