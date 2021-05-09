import { CreateUserDTO } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find()
        return users;
    }

    async getUser(userID:string): Promise<User> {
        const user = await this.userModel.findById(userID);
        return user;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const user = await new this.userModel(createUserDTO);
        return await user.save();
    }

    async deleteUser(userID: string): Promise<User>{
        const deletedUser = await this.userModel.findByIdAndDelete(userID);
        return deletedUser;
    }

    async updateUser(userID: string, createUserDTO:  CreateUserDTO): Promise<User>{
        const updatedUser = await this.userModel.findByIdAndUpdate(userID, 
            createUserDTO, { new: true });
        return updatedUser;
    }
}
