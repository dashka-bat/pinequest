import { model, models, Schema, Types } from 'mongoose';

const ThanksSchema = new Schema(
  {
    fromUser: { type: Types.ObjectId, ref: 'User', required: true },
    toUser: { type: Types.ObjectId, ref: 'User', required: true },
    event: { type: Types.ObjectId, ref: 'Event', required: true },
    message: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ThanksModel = models.Thanks || model('Thanks', ThanksSchema);

export type Thanks = {
  _id: string;
  fromUser: string;
  toUser: string;
  event: string;
  message?: string;
  createdAt: string;
};
