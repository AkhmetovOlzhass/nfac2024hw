import { Schema, model, Document } from 'mongoose';

interface ISong extends Document {
  title: string;
  artist: string;
  url: string;
  artistId: string;
  coverUrl: string;
}

const songSchema = new Schema<ISong>({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String, required: true },
  artistId: { type: String, required: true },
  coverUrl: { type: String, required: true },
});

const Song = model<ISong>('Song', songSchema);
export { ISong, Song };