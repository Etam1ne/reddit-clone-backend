import { IsEmail } from "class-validator"

export class CreateUserDto {
    public username: string;

    @IsEmail()
    public email: string;

    public userImage: string;
}