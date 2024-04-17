import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserInfo } from "src/usersInfo/userInfo.schema";
import { Model, Types } from 'mongoose';
import { AddUserDto, GetUserDto } from "./users.dto";
import { User } from "./users.schema";
import { Natal } from "src/natal/natal.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserInfo.name)
        private readonly userInfoModel: Model<UserInfo>,

        @InjectModel(User.name)
        private readonly userModel: Model<User>,

        @InjectModel(Natal.name)
        private readonly natalModel: Model<Natal>,

    ) { }

    async addUser(body:AddUserDto){
        try {
            const user = await this.userModel.create({
                userName:body.userName,
                middleName:body.middleName,
                surName:body.surName,
            })
            const userId = new Types.ObjectId(user._id);
            const userInfo = await this.userInfoModel.create({
                user:userId
            })
            const natal = await this.natalModel.create({userInfo:userInfo._id,coordinates:body.coordinates, dateBirth:body.dateBirth, origin:body.origin})
            user.updateOne({_id:userId}, {userInfo:userInfo._id});
            userInfo.updateOne({_id:userInfo._id}, {natal:natal._id})
            return {...userInfo.populate({path:'user'}), natal}
        } catch (error) {
            throw error;
        }
    }
    async getUsers(){
        try {
            const users = await this.userModel.find({}).lean()
            const populatedUsers = await Promise.all(users.map(async(user:any)=>{
                const userInfo = await this.userInfoModel.findOne({user:user._id});
                const natal = await this.natalModel.findOne({userInfo:userInfo._id});
                return{
                    ...user,
                    userInfo:{...userInfo, natal}
                }
            }))
            return populatedUsers;
        } catch (error) {
            throw error;
        }
    }
    async getUser(body:GetUserDto){
        try {
            const userId = new Types.ObjectId(body.userId)
            const user = await this.userModel.findOne({_id:userId}).lean()
            const userInfo = await this.userInfoModel.findOne({user:userId})
            const natal = await this.natalModel.findOne({userInfo:userInfo._id})
            return {
                ...user,
                userInfo:{...userInfo, natal}
            };
        } catch (error) {
            throw error;
        }
    }
}