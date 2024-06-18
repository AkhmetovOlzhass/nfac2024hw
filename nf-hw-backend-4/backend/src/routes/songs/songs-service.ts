import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Song } from "./models/Song";
import { s3Client } from '../../middlewares/s3-middleware';

import { uploadFileToS3 } from "../s3-module";
import { ParsedQs } from "qs";
import { Playlist } from "./models/Playlist";
import User from "../auth/models/User";


interface CreateSongParams {
  songFile: Express.Multer.File;
  coverImageFile: Express.Multer.File;
  bucketName: string;
}

interface UpdateSongParams {
  title: string;
  songFile?: Express.Multer.File;
  coverImageFile?: Express.Multer.File;
  bucketName: string;
}



class SongsService {

  async createSong({ songFile, coverImageFile, bucketName }: CreateSongParams, req) {
    
    const songUrl = await uploadFileToS3({ file: songFile, bucketName});
    const coverUrl = await uploadFileToS3({ file: coverImageFile, bucketName});

    const song = new Song({
      title: req.title,
      artist: req.artist,
      artistId: req.artistId,
      url: songUrl,
      coverUrl: coverUrl,
      favorite: false
    });

    await song.save();
    return song;
  }

  async getAllSongs() {
    try {
      const songs = await Song.find();
      return songs;
    } catch (error) {
      throw new Error('Failed to fetch songs');
    }
  }

  async getSongsById(id: string) {
    try {
      const songs = await Song.find({ artistId: id });
      return songs;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }

  async deleteSong(songId: string, bucketName: string): Promise<void> {
    try {

      const song = await Song.findById(songId);

      if (!song) {
        throw new Error("Song not found");
      }

      const songKey = new URL(song.url).pathname.substring(1);
      const coverKey = new URL(song.coverUrl).pathname.substring(1);

      await s3Client.send(new DeleteObjectCommand({
        Bucket: bucketName,
        Key: songKey,
      }));

      await s3Client.send(new DeleteObjectCommand({
        Bucket: bucketName,
        Key: coverKey,
      }));

      await Song.findByIdAndDelete(songId);
    } catch (error) {
      throw new Error(`Failed to delete song`);
    }
  }

  async updateSong(id: string, { title, songFile, coverImageFile, bucketName }: UpdateSongParams): Promise<any> {
    const song = await Song.findById(id);
    if (!song) {
      throw new Error('Song not found');
    }

    if (songFile) {
      const songUrl = await uploadFileToS3({ file: songFile, bucketName });
      song.url = songUrl;
    }

    if (coverImageFile) {
      const coverUrl = await uploadFileToS3({ file: coverImageFile, bucketName });
      song.coverUrl = coverUrl;
    }

    song.title = title;

    await song.save();
    return song;
  }

  async createPlaylist({ playlistName, playlistDescr, playlistCover,userId, bucketName }, req) {

    const coverUrl = await uploadFileToS3({ file: playlistCover, bucketName });

    const playlist = new Playlist({
      title: playlistName,
      description: playlistDescr,
      coverUrl: coverUrl,
      userId: userId,
      playlistType: '',
      songs: []
    });

    await playlist.save();
    return playlist;
  }

  async getAllPlaylists() {
    const playlists = await Playlist.find();
    return playlists;
  }

  async updatePlaylist(playlistId, songId) {
    const playlist = await Playlist.findById(playlistId);
    if (playlist) {
      if (!playlist.songs.includes(songId)) {
        playlist.songs.push(songId);
        await playlist.save();
      }
    } else {
      throw new Error("Playlist not found");
    }
  }

  async getSongById(id: string) {
    try {
      const song = await Song.findById(id);
      return song;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }

  async addToFavorite(userId: string, songId: string): Promise<any> {
    const user = await User.findById(userId);
    
    if(user){
      const index = user.favorites.indexOf(songId);
      if (index === -1) {
        user.favorites.push(songId);
      } else {
        user.favorites.splice(index, 1);
      }
      await user.save();
    }
    return user;
  }

}

export default SongsService;