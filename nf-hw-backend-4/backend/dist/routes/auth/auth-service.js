"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const RefreshToken_1 = __importDefault(require("./models/RefreshToken"));
dotenv_1.default.config();
class AuthService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET;
        this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
    }
    async registerUser(createUserDto) {
        const { email, password, username } = createUserDto;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({
            email,
            password: hashedPassword,
            username,
            popular: false,
            favorites: []
        });
        await newUser.save();
        return newUser;
    }
    async loginUser(email, password) {
        const user = await User_1.default.findOne({ email });
        if (!user)
            return null;
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid)
            return null;
        const accessToken = this.generateJwt(user);
        const refreshToken = this.generateRefreshToken(user);
        const refreshTokenDoc = new RefreshToken_1.default({
            token: refreshToken,
            user: user._id
        });
        await refreshTokenDoc.save();
        return { user, accessToken, refreshToken };
    }
    generateJwt(user) {
        return jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, this.jwtSecret, {
            expiresIn: '1h'
        });
    }
    generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, this.jwtRefreshSecret, { expiresIn: '7d' });
    }
    verifyJwt(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.jwtSecret);
        }
        catch (err) {
            return null;
        }
    }
    verifyRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.jwtRefreshSecret);
        }
        catch (err) {
            return null;
        }
    }
    async refreshToken(oldToken) {
        const payload = this.verifyRefreshToken(oldToken);
        if (!payload)
            return null;
        const user = await User_1.default.findById(payload.id);
        if (!user)
            return null;
        const newAccessToken = this.generateJwt(user);
        const newRefreshToken = this.generateRefreshToken(user);
        const refreshTokenDoc = new RefreshToken_1.default({
            token: newRefreshToken,
            user: user._id
        });
        await refreshTokenDoc.save();
        await RefreshToken_1.default.deleteOne({ token: oldToken });
        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}
exports.default = AuthService;
