import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import User from '../auth/models/User';
import { s3Client } from '../../middlewares/s3-middleware';
import { uploadFileToS3 } from '../s3-module';


interface UpdateUserParams {
    username: string;
    email: string,
    description: string,
    avatar?: Express.Multer.File;
    bucketName: string;
  }


class UserService {
  async getUserById(id: string) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }

  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }

  async updateUser(id: string, { username, email, description, avatar, bucketName }: UpdateUserParams) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      user.username = username;
      user.email = email;
      user.description = description;
      

      if (avatar) {
        const avatarUrl = await uploadFileToS3({ file: avatar, bucketName });
        
        user.avatarUrl = avatarUrl;
      }

      await user.save();
      return user;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }



}

export default UserService;