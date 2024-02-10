import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const post: Post = new Post();
    
    post.title = createPostDto.title,
    post.date = createPostDto.date,
    post.author = createPostDto.author,
    post.description = createPostDto.description,
    post.images = createPostDto.images,
    post.tags = createPostDto.tags
    post.comments = createPostDto.comments

    return this.postRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: string): Promise<Post> {
    return this.postRepository.findOneBy({ id });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    const post: Post = new Post();

    post.id = id,
    post.title = updatePostDto.title,
    post.date = updatePostDto.date,
    post.author = updatePostDto.author,
    post.description = updatePostDto.description,
    post.images = updatePostDto.images,
    post.tags = updatePostDto.tags
    post.comments = updatePostDto.comments
  
    return this.postRepository.save(post);
  }

  remove(id: string) {
    return this.postRepository.delete(id);
  }
}
