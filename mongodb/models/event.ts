import { model, models, Schema, Types } from 'mongoose';
import { User } from './user';

const EventSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    phone: { type: Number, required: true },
    goal: { type: String, required: false },
    imageUrl: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    company: { type: Number, required: true },
    user: { type: Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

export const EventModel = models.Event || model('Event', EventSchema);

export type Event = {
  _id: string;
  name: string;
  type: string;
  date: string;
  goal?: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  phone: number;
  company: number;
  user: User;
};
