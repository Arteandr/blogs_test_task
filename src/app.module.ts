import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./blogs/blog.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync( {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.get(`POSTGRES_HOST`) ?? "localhost",
          port: configService.get(`POSTGRES_PORT`) ?? 5432,
          username: configService.get(`POSTGRES_USER`),
          password: configService.get(`POSTGRES_PASSWORD`),
          database: configService.get(`POSTGRES_DB`),
          entities: [Blog],
          synchronize: true,
        }
      }
    }
    ),
    BlogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
