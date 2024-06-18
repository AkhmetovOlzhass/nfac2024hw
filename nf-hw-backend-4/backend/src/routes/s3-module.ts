import { Upload } from '@aws-sdk/lib-storage';
import { s3Client } from '../middlewares/s3-middleware';

interface UploadFileParams {
    file: Express.Multer.File;
    bucketName: string;
  }

export async function uploadFileToS3({ file, bucketName }: UploadFileParams) {
    const key = `${Date.now()}-${file.originalname}`;
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: key,
        Body: file.buffer
      }
    });

    upload.on('httpUploadProgress', (progress) => {
        console.log(`Upload progress: ${progress.loaded} of ${progress.total} bytes`);
    });

    const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    await upload.done();
    
    return url;
}


