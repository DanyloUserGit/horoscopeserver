import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./users.service";
import { AddUserDto, GetUserDto } from "./users.dto";

@Controller('users')
export class UserController{
    constructor(private readonly userService:UserService){}

    @Post('add-user')
    async addUser(@Body() body:AddUserDto) {
        return await this.userService.addUser(body)
    }   

    @Post('get-users')
    async getUsers() {
        return await this.userService.getUsers()
    } 

    @Post('get-user')
    async getUser(@Body() body:GetUserDto) {
        return await this.userService.getUser(body)
    } 
}
