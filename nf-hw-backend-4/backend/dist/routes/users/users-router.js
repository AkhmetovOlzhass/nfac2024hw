"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("./users-controller"));
const multer_1 = __importDefault(require("multer"));
const users_service_1 = __importDefault(require("./users-service"));
const userRouter = (0, express_1.Router)();
const userService = new users_service_1.default();
const usersController = new users_controller_1.default(userService);
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
userRouter.get('/users', (req, res) => usersController.getUsers(req, res));
userRouter.get('/:id', (req, res) => usersController.getUserById(req, res));
userRouter.put('/:id', upload.single('avatar'), (req, res) => usersController.updateUser(req, res));
exports.default = userRouter;
