import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  groupId: { type: String, ref: 'Group' },
});


export const UserModel = mongoose.model('User', UserSchema);
