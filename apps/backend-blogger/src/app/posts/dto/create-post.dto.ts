import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDate, IsArray } from "class-validator";

export class CreatePostDto {
    @ApiProperty({ title: 'title', type: 'string', description: 'The main title of the specific blog post', example: 'Top 10 ways of creating good blog posts!' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ title: 'date', description: 'The time stamp of the blog post.', example: '1st January 2024' })
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ title: 'author', type: 'string', description: 'The name of the person who wrote the blog', example: 'Phil Teasdale' })
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({ title: 'description', description: 'The full description from the blog post', example: 'The blog post is.... ' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ title: 'images', type: [String], description: 'The array of image urls for the blog post', example: '[http://localhost:4200/assets/image.png]' })
    @IsArray()
    images: Array<string>;

    @ApiProperty({ title: 'tags', type: [String], description: 'The array of tags for the blog post', example: '[travel, home, sport, music, weather]' })
    @IsArray()
    tags: Array<string>;

    @ApiProperty({ title: 'comments', type: [String], description: 'The array of UID for all the comments on the post', example: '[f8444fbd-40ae-4a77-8452-d4452edefd24, f8444fbd-40ae-4a77-8452-d4452edefd24]' })
    @IsArray()
    comments: Array<string>;
}
