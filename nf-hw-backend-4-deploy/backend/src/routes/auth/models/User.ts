import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string,
  username: string,
  description?: string,
  avatarUrl?: string,
  popular: boolean,
  favorites: string[],
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  description: { type: String, required: false },
  avatarUrl: { type: String, required: false },
  popular: { type: Boolean, required: false },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Favorites',
    default: []
  },
})

export default mongoose.model<IUser>('User', UserSchema)
