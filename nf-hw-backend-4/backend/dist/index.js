"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const global_router_1 = __importDefault(require("./routes/global-router"));
const logger_1 = require("./logger");
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
app.use(logger_1.logger);
app.use('/api/v5', global_router_1.default);
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('updateTrack', (data) => {
        io.emit('trackUpdated', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
httpServer.listen(5000, () => {
    console.log('Server running at http://localhost:5000/api/v5');
});
