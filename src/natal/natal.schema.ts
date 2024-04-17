import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { UserInfo } from "src/usersInfo/userInfo.schema";

export type NatalDocument = HydratedDocument<Natal>;

@Schema()
export class Natal {
    @Prop({type:Types.ObjectId, ref:'UserInfo'})
    userInfo:Types.ObjectId;

    @Prop({type:Date})
    dateBirth:Date;

    @Prop({type:Object})
    coordinates:{};

    @Prop({type:Object})
    origin:{};
}

export const NatalSchema = SchemaFactory.createForClass(Natal);