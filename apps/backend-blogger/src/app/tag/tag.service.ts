import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ){}

  create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag: Tag = new Tag();

    tag.name = createTagDto.name;

    return this.tagRepository.save(tag);
  }

  findAll() {
    return this.tagRepository.find();
  }

  update(id: string, updateTagDto: UpdateTagDto) {
    const tag: Tag = new Tag();

    tag.id = id,
    tag.name = updateTagDto.name

    return this.tagRepository.save(tag);
  }

  remove(id: string) {
    return this.tagRepository.delete(id);
  }
}
