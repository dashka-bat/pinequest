import { model, models, Schema } from 'mongoose';
const userSchema = new Schema({
  name: { type: String },
  password: { type: String },
});

export const userModel = models.user || model('user', userSchema);
