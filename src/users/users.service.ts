import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(email: string, hash: string): Promise<User> {
        const newUser = new this.userModel({ email, hash });
        return newUser.save();
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }
}
