/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { Order, User } from './users.Interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const OrderSchema = new Schema<Order>({
  productName: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const UserSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], default: [], trim: true },
  address: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
  },
  orders: { type: [OrderSchema], default: [] },
});

UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

UserSchema.post('save', function (doc, next) {
  doc.password = ' ';

  next();
});

export const UserModel = model<User>('User', UserSchema);
