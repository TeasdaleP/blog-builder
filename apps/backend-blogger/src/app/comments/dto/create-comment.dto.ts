import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ title: 'blogId', description: 'The unique identifier of the related blog post', example: 'eed76ca3-7451-4274-9315-44979c27a0fe' })
    @IsDate()
    @IsNotEmpty()
    blogId: string;

    @ApiProperty({ title: 'date', description: 'The time stamp of the comment', example: '1st January 2024' })
    @IsDate()
    date: Date;

    @ApiProperty({ title: 'author', type: 'string', description: 'The name of the person who wrote the comment', example: 'Phil Teasdale' })
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({ title: 'comment', description: 'The full comment provided be the user', example: 'I think this blog post is.... ' })
    @IsString()
    @IsNotEmpty()
    comment: string;
}
