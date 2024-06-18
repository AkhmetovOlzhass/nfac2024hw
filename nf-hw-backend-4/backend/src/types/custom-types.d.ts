import { File } from 'multer';

declare global {
  namespace Express {
    interface Request {
      files?: {
        [key: string]: File[];
      };
    }
  }
}