import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
    @ApiProperty({ title: 'name', description: 'The name of the tag for the blog posts', example: 'Blogging' })
    @IsString()
    @IsNotEmpty()
    name: string;
}
