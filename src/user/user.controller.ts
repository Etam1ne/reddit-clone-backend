import { Controller, Get, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";
import { User } from "./interfaces/user.interface";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() createUSerDto: CreateUserDto) {
        this.userService.create(createUSerDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();  
    }
}