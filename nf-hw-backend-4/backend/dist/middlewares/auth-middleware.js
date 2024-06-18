"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_service_1 = __importDefault(require("../routes/auth/auth-service"));
const authService = new auth_service_1.default();
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    const payload = authService.verifyJwt(token);
    if (!payload) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
    ;
    req.user = payload;
    next();
};
exports.authMiddleware = authMiddleware;
