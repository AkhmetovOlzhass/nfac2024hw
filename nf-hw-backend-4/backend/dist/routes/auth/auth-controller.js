"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    constructor(authService) {
        this.registerUser = async (req, res) => {
            try {
                const createUserDto = req.body;
                const user = await this.authService.registerUser(createUserDto);
                res.status(201).json(user);
            }
            catch (err) {
                res.status(500).json({ message: 'Error registering user' });
            }
        };
        this.loginUser = async (req, res) => {
            try {
                const { email, password } = req.body;
                const result = await this.authService.loginUser(email, password);
                if (!result) {
                    res.status(401).json({ message: 'Invalid email or password' });
                    return;
                }
                res.status(200).json(result);
            }
            catch (err) {
                res.status(500).json({ message: 'Error logging in' });
            }
        };
        this.refreshToken = async (req, res) => {
            try {
                const { token } = req.body;
                const result = await this.authService.refreshToken(token);
                if (!result) {
                    res.status(401).json({ message: 'Invalid or expired refresh token' });
                    return;
                }
                res.status(200).json(result);
            }
            catch (err) {
                res.status(500).json({ message: 'Error refreshing token' });
            }
        };
        this.authService = authService;
    }
}
exports.default = AuthController;
