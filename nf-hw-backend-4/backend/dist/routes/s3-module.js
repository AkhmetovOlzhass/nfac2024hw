"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToS3 = void 0;
const lib_storage_1 = require("@aws-sdk/lib-storage");
const s3_middleware_1 = require("../middlewares/s3-middleware");
async function uploadFileToS3({ file, bucketName }) {
    const key = `${Date.now()}-${file.originalname}`;
    const upload = new lib_storage_1.Upload({
        client: s3_middleware_1.s3Client,
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
exports.uploadFileToS3 = uploadFileToS3;
