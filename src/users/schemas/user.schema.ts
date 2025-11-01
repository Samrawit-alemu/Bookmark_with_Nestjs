import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class User {
    _id?: Types.ObjectId;
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    hash: string;
    // private _id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;


