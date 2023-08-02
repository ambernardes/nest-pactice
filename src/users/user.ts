import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  @Prop()
  id: number;
  @Prop()
  email: string;
  @Prop()
  first_name: string;
  @Prop()
  last_name: string;
  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
