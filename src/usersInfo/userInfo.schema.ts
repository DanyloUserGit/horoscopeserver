import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Natal } from "src/natal/natal.schema";
import { User } from "src/users/users.schema";

export type UserInfoDocument = HydratedDocument<UserInfo>;

@Schema()
export class UserInfo {
    @Prop({ type: Types.ObjectId, ref: 'User' }) 
    user: Types.ObjectId;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);