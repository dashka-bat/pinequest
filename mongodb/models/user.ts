import { model, models, Schema } from 'mongoose';
const userSchema = new Schema(
  {
    company: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    occupation: { type: String, required: true },
    allowPersonalData: { type: Boolean, required: true },
    isAdmin: { type: Boolean, required: true, default: () => false },
  },
  { timestamps: true }
);

export const userModel = models.user || model('user', userSchema);

export type User = {
  _id: string;
  company: string;
  name: string;
  email: string;
  occupation: string;
  allowPersonalData: boolean;
  isAdmin: boolean;
};
