import { IsDate, IsDateString, IsObject, IsString } from "class-validator";

export class AddUserDto{
    @IsString()
    userName:string;

    @IsString()
    middleName:string;

    @IsString()
    surName:string;

    @IsObject()
    coordinates:{};

    @IsDateString()
    dateBirth:Date;

    @IsObject()
    origin:{};
}

export class GetUserDto{
    @IsString()
    userId:string;_
}