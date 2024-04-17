import { Body, Controller, Post } from "@nestjs/common";
import { NatalService } from "./natal.service";
import { GetPointsDto } from "./natal.dto";

@Controller('natal')
export class NatalController{
    constructor(private readonly natalService:NatalService){}

    @Post('points')
    async getPoints(@Body() body:GetPointsDto) {
        return await this.natalService.getPoints(body)
    }   
}
