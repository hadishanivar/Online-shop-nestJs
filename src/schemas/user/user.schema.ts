import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, default: 'user', enum: ['user', 'admin'] })
  role: 'user' | 'admin';

  @Prop({ type: String, required: 'password is required' })
  password: string;

  @Prop({ type: String, required: 'phone number is required' })
  phoneNumber: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>(`save`, async function (next) {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 12);

  next();
});