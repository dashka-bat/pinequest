import { model, models, Schema, Types } from 'mongoose';
import { User } from './user';

const NoteSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'user' },
    company: { type: String, required: true },
    text: { type: String, required: true },
    positionX: { type: Number, required: true },
    positionY: { type: Number, required: true },
  },
  { timestamps: true }
);

export const NoteModel = models.note || model('note', NoteSchema);

export type Note = {
  user?: User;
  text: string;
  company: string;
  positionX: number;
  positionY: number;
};
