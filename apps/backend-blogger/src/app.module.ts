import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { PostsModule } from './app/posts/posts.module';
import { Post } from './app/posts/entities/post.entity';
import { AuthModule } from './app/auth/auth.module';
import { User } from './app/users/entities/user.entities';
import { UsersModule } from './app/users/users.module';
import { CommentsModule } from './app/comments/comments.module';
import { Comment } from './app/comments/entities/comment.entity';
import { Tag } from './app/tag/entities/tag.entity';
import { TagModule } from './app/tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USERNAME,
      entities: [Post, User, Comment, Tag],
      database: process.env.DATABASE_TABLE,
      synchronize: true,
      logging: true,
    }),
    PostsModule,
    UsersModule,
    AuthModule,
    CommentsModule,
    TagModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
