"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../auth/models/User"));
const s3_module_1 = require("../s3-module");
class UserService {
    async getUserById(id) {
        try {
            const user = await User_1.default.findById(id);
            return user;
        }
        catch (error) {
            throw new Error('Failed to fetch user');
        }
    }
    async getUsers() {
        try {
            const users = await User_1.default.find();
            return users;
        }
        catch (error) {
            throw new Error('Failed to fetch user');
        }
    }
    async updateUser(id, { username, email, description, avatar, bucketName }) {
        try {
            const user = await User_1.default.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            user.username = username;
            user.email = email;
            user.description = description;
            if (avatar) {
                const avatarUrl = await (0, s3_module_1.uploadFileToS3)({ file: avatar, bucketName });
                user.avatarUrl = avatarUrl;
            }
            await user.save();
            return user;
        }
        catch (error) {
            throw new Error('Failed to update user');
        }
    }
}
exports.default = UserService;
