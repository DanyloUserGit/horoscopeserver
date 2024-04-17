import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Natal, NatalSchema } from "src/natal/natal.schema";
import { UserInfo, UserInfoSchema } from "src/usersInfo/userInfo.schema";
import { UserController } from "./users.controller";
import { User, UserSchema } from "./users.schema";
import { UserService } from "./users.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: UserInfo.name, schema: UserInfoSchema },
            { name: Natal.name, schema: NatalSchema },
            
        ]),
    ],
    controllers:[UserController],
    providers:[UserService],
})
export class UserModule{}