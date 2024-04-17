import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Natal, NatalSchema } from "src/natal/natal.schema";
import { UserController } from "src/users/users.controller";
import { User, UserSchema } from "src/users/users.schema";
import { UserService } from "src/users/users.service";
import { UserInfo, UserInfoSchema } from "./userInfo.schema";

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
export class UserInfoModule{}