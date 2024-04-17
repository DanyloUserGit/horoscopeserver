import { Module } from "@nestjs/common";
import { NatalController } from "./natal.controller";
import { NatalService } from "./natal.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/users.schema";
import { UserInfo, UserInfoSchema } from "src/usersInfo/userInfo.schema";
import { Natal, NatalSchema } from "./natal.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: UserInfo.name, schema: UserInfoSchema },
            { name: Natal.name, schema: NatalSchema },
            
        ]),
    ],
    controllers:[NatalController],
    providers:[NatalService],
})
export class NatalModule{}