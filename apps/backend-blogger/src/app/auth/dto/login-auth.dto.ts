import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({ title: 'email', type: 'string', description: 'This is the email address for login', example: 'phil@teasdale.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ title: 'password', type: 'string', description: 'This is the password for login', example: 'pa$$word' })
    @IsString()
    @IsNotEmpty()
    password: string;
}