"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    async getUsers(req, res) {
        try {
            const user = await this.userService.getUsers();
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const avatarImage = req.file ? req.file : undefined;
            const updatedData = {
                username: req.body.username,
                email: req.body.email,
                description: req.body.description,
                avatar: avatarImage,
                bucketName: process.env.AWS_BUCKET_NAME,
            };
            const updatedUser = await this.userService.updateUser(id, updatedData);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
exports.default = UsersController;
