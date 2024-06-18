"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const auth_controller_1 = __importDefault(require("./auth-controller"));
const auth_service_1 = __importDefault(require("./auth-service"));
const authRouter = (0, express_1.Router)();
const authService = new auth_service_1.default();
const authController = new auth_controller_1.default(authService);
authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.get('/protected', auth_middleware_1.authMiddleware, (req, res) => {
    res.json({ message: 'You have access to this route!' });
});
exports.default = authRouter;
