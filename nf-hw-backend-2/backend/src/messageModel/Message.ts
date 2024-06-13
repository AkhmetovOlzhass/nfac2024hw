import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  username: string;
  text: string;
  roomId: string;
  socketID: string;
  createdAt: Date;
  messageId: string;
}

const MessageSchema: Schema = new Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  roomId: { type: String, required: true },
  socketID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  messageId: { type: String, required: true },
});

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;