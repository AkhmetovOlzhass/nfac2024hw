"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = void 0;
const mongoose_1 = require("mongoose");
const PlaylistSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    songs: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Song',
        default: []
    },
    coverUrl: { type: String, required: true },
    userId: { type: String, required: true },
    playlistType: { type: String, required: false }
});
const Playlist = (0, mongoose_1.model)('Playlist', PlaylistSchema);
exports.Playlist = Playlist;
