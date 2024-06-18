"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth/auth-router"));
const songs_router_1 = __importDefault(require("./songs/songs-router"));
const users_router_1 = __importDefault(require("./users/users-router"));
const globalRouter = (0, express_1.Router)();
globalRouter.use('/auth', auth_router_1.default);
globalRouter.use('/songs', songs_router_1.default);
globalRouter.use('/users', users_router_1.default);
exports.default = globalRouter;
