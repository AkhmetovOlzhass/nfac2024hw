"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = require("mongoose");
const songSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    url: { type: String, required: true },
    artistId: { type: String, required: true },
    coverUrl: { type: String, required: true },
});
const Song = (0, mongoose_1.model)('Song', songSchema);
exports.Song = Song;
