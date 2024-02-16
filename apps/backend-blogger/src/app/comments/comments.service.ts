import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { DataSource, In, Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectDataSource() private dataSource: DataSource
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Record<string, any>> {
    const blogId: string = createCommentDto.blogId;
    const comment: Comment = new Comment();

    comment.date = createCommentDto.date,
    comment.author = createCommentDto.author,
    comment.comment = createCommentDto.comment
    const result = await this.commentRepository.save(comment);

    if (!result) {
      throw new BadRequestException();
    }
    
    const post = await this.dataSource.getRepository(Post).findOneBy({ id: blogId }); 

    if (!post) {
      throw new BadRequestException();
    }

    let update: Post = new Post();
    update.id = blogId,
    update.title = post.title
    update.author = post.author,
    update.date = post.date,
    update.description = post.description,
    update.images = post.images,
    update.tags = post.tags,
    update.comments = [ ...post.comments, result.id]
    const updated = await this.dataSource.getRepository(Post).save(update);

    if (!updated) {
      throw new BadRequestException();
    }

    return result;
  }

  findAll() {
    return this.commentRepository.find();
  }

  async findOne(blogId: string) {
    const post = await this.dataSource.getRepository(Post).findOneBy({ id: blogId }); 
    
    if (!post) {
      throw new BadRequestException();
    }

    return await this.dataSource.getRepository(Comment).findBy({ id: In(post.comments) });
  }

  async remove(blogId: string, commentId: string) {
    const post = await this.dataSource.getRepository(Post).findOneBy({ id: blogId }); 

    if (post) {
      let update: Post = new Post();
      update.id = post.id,
      update.title = post.title
      update.author = post.author,
      update.date = post.date,
      update.description = post.description,
      update.images = post.images,
      update.tags = post.tags,
      update.comments = post.comments.filter((comment) => comment !== commentId);
      const updated = await this.dataSource.getRepository(Post).save(update);

      if (!updated) {
        throw new BadRequestException();
      }
    }

    return this.commentRepository.delete(commentId);;
  }
}
