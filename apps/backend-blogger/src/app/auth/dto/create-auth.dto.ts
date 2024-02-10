import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ title: 'firstname', type: 'string', description: 'This is the firstname of the user', example: 'Phil' })
    @IsString()
    firstname: string;

    @ApiProperty({ title: 'lastname', type: 'string', description: 'This is the lastname of the user', example: 'Teasdale' })
    @IsString()
    lastname: string;

    @ApiProperty({ title: 'email', type: 'string', description: 'This is the email address for login', example: 'phil@teasdale.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ title: 'password', type: 'string', description: 'This is the password for login', example: 'pa$$word' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ title: 'account', type: 'string', description: 'This is the type of profile the user has', example: 'BLOGGER' })
    @IsString()
    @IsEnum(['USER', 'ADMIN', 'BLOGGER'])
    account: string;
}
