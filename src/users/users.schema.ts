import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { UserInfo } from "src/usersInfo/userInfo.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({type:String})
    userName:string;

    @Prop({type:String})
    middleName:string;

    @Prop({type:String})
    surName:string;
}

export const UserSchema = SchemaFactory.createForClass(User);