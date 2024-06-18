import { Schema, model, Document } from 'mongoose';

interface IPlaylist extends Document {
  title: string;
  description: string;
  coverUrl: string;
  songs: Schema.Types.ObjectId[];
  userId: string;
  playlistType?: string

}

const PlaylistSchema = new Schema<IPlaylist>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  songs: {
    type: [Schema.Types.ObjectId],
    ref: 'Song',
    default: []
  },
  coverUrl: { type: String, required: true },
  userId: { type: String, required: true },
  playlistType: {type: String, required: false}

});

const Playlist = model<IPlaylist>('Playlist', PlaylistSchema);
export { IPlaylist, Playlist };
