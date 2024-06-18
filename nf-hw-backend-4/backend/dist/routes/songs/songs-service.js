"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const Song_1 = require("./models/Song");
const s3_middleware_1 = require("../../middlewares/s3-middleware");
const s3_module_1 = require("../s3-module");
const Playlist_1 = require("./models/Playlist");
const User_1 = __importDefault(require("../auth/models/User"));
class SongsService {
    async createSong({ songFile, coverImageFile, bucketName }, req) {
        const songUrl = await (0, s3_module_1.uploadFileToS3)({ file: songFile, bucketName });
        const coverUrl = await (0, s3_module_1.uploadFileToS3)({ file: coverImageFile, bucketName });
        const song = new Song_1.Song({
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
            const songs = await Song_1.Song.find();
            return songs;
        }
        catch (error) {
            throw new Error('Failed to fetch songs');
        }
    }
    async getSongsById(id) {
        try {
            const songs = await Song_1.Song.find({ artistId: id });
            return songs;
        }
        catch (error) {
            throw new Error('Failed to fetch user');
        }
    }
    async deleteSong(songId, bucketName) {
        try {
            const song = await Song_1.Song.findById(songId);
            if (!song) {
                throw new Error("Song not found");
            }
            const songKey = new URL(song.url).pathname.substring(1);
            const coverKey = new URL(song.coverUrl).pathname.substring(1);
            await s3_middleware_1.s3Client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: bucketName,
                Key: songKey,
            }));
            await s3_middleware_1.s3Client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: bucketName,
                Key: coverKey,
            }));
            await Song_1.Song.findByIdAndDelete(songId);
        }
        catch (error) {
            throw new Error(`Failed to delete song`);
        }
    }
    async updateSong(id, { title, songFile, coverImageFile, bucketName }) {
        const song = await Song_1.Song.findById(id);
        if (!song) {
            throw new Error('Song not found');
        }
        if (songFile) {
            const songUrl = await (0, s3_module_1.uploadFileToS3)({ file: songFile, bucketName });
            song.url = songUrl;
        }
        if (coverImageFile) {
            const coverUrl = await (0, s3_module_1.uploadFileToS3)({ file: coverImageFile, bucketName });
            song.coverUrl = coverUrl;
        }
        song.title = title;
        await song.save();
        return song;
    }
    async createPlaylist({ playlistName, playlistDescr, playlistCover, userId, bucketName }, req) {
        const coverUrl = await (0, s3_module_1.uploadFileToS3)({ file: playlistCover, bucketName });
        const playlist = new Playlist_1.Playlist({
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
        const playlists = await Playlist_1.Playlist.find();
        return playlists;
    }
    async updatePlaylist(playlistId, songId) {
        const playlist = await Playlist_1.Playlist.findById(playlistId);
        if (playlist) {
            if (!playlist.songs.includes(songId)) {
                playlist.songs.push(songId);
                await playlist.save();
            }
        }
        else {
            throw new Error("Playlist not found");
        }
    }
    async getSongById(id) {
        try {
            const song = await Song_1.Song.findById(id);
            return song;
        }
        catch (error) {
            throw new Error('Failed to fetch user');
        }
    }
    async addToFavorite(userId, songId) {
        const user = await User_1.default.findById(userId);
        if (user) {
            const index = user.favorites.indexOf(songId);
            if (index === -1) {
                user.favorites.push(songId);
            }
            else {
                user.favorites.splice(index, 1);
            }
            await user.save();
        }
        return user;
    }
}
exports.default = SongsService;
