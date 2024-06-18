"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SongsController {
    constructor(songsService) {
        this.songsService = songsService;
    }
    async createSong(req, res) {
        try {
            const songFile = req.files?.['song'] ? req.files['song'][0] : null;
            const coverImageFile = req.files?.['coverImage'] ? req.files['coverImage'][0] : null;
            const result = await this.songsService.createSong({ songFile, coverImageFile, bucketName: process.env.AWS_BUCKET_NAME }, req.body);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getAllSongs(req, res) {
        try {
            const songs = await this.songsService.getAllSongs();
            res.status(200).json(songs);
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getSongsById(req, res) {
        try {
            const { id } = req.params;
            const songs = await this.songsService.getSongsById(id);
            if (!songs) {
                res.status(404).json({ message: 'Songs not found' });
                return;
            }
            res.status(200).json(songs);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    async deleteSong(req, res) {
        try {
            const { id } = req.params;
            await this.songsService.deleteSong(id, process.env.AWS_BUCKET_NAME);
            res.status(200).json({ message: "Song deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Failed to delete song" });
        }
    }
    async updateSong(req, res) {
        try {
            const { id } = req.params;
            const songFile = req.files?.['song'] ? req.files['song'][0] : null;
            const coverImageFile = req.files?.['coverImage'] ? req.files['coverImage'][0] : null;
            const updatedData = {
                title: req.body.title,
                songFile,
                coverImageFile,
                bucketName: process.env.AWS_BUCKET_NAME,
            };
            const result = await this.songsService.updateSong(id, updatedData);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async createPlaylist(req, res) {
        try {
            const playlistName = req.body.playlistName;
            const playlistDescr = req.body.playlistDescr;
            const userId = req.body.userId;
            const playlistCover = req.file ? req.file : null;
            const result = await this.songsService.createPlaylist({
                playlistName,
                playlistDescr,
                playlistCover,
                userId,
                bucketName: process.env.AWS_BUCKET_NAME
            }, req.body);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to create playlist" });
        }
    }
    async getAllPlaylists(req, res) {
        try {
            const playlists = await this.songsService.getAllPlaylists();
            res.status(200).json(playlists);
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async updatePlaylist(req, res) {
        try {
            const { playlistId } = req.params;
            const { songId } = req.body;
            const result = await this.songsService.updatePlaylist(playlistId, songId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getSongById(req, res) {
        try {
            const { id } = req.params;
            const song = await this.songsService.getSongById(id);
            if (!song) {
                res.status(404).json({ message: 'Songs not found' });
                return;
            }
            res.status(200).json(song);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    async addToFavorite(req, res) {
        try {
            const { id } = req.params;
            const songId = req.body.songId;
            const result = await this.songsService.addToFavorite(id, songId);
            console.log(result);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.default = SongsController;
