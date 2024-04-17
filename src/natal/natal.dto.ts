import {IsObject, IsString} from 'class-validator';

export class GetPointsDto {
    @IsString()
    readonly minute: string;

    @IsString()
    readonly hour: string;

    @IsString()
    readonly day: string;

    @IsString()
    readonly month: string;
    
    @IsString()
    readonly year: string;

    @IsObject()
    readonly coordinates:{
        lat:number,
        lng:number
    }
}