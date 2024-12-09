import { SeaweedOptions } from ".././interfaces/seaweed-module-options";
import { Readable } from "stream";
export declare class StorageService {
    private options;
    private client;
    constructor(options: SeaweedOptions);
    private createConnection;
    listBuckets(): Promise<import("@aws-sdk/client-s3").Bucket[]>;
    createBucket(bucketName: string): Promise<import("@aws-sdk/client-s3").CreateBucketCommandOutput>;
    deleteBucket(bucketName: string): Promise<import("@aws-sdk/client-s3").DeleteBucketCommandOutput>;
    uploadFile(bucketName: string, objectName: string, file: Buffer): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
    deleteObject(bucketName: string, objectName: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
    downloadObject(bucketName: string, objectName: string): Promise<Readable>;
    getPresignedDownloadUrl(bucketName: string, objectName: string, expiresIn?: number): Promise<string>;
    getPresignedUploadUrl(bucketName: string, objectName: string, expiresIn?: number): Promise<string>;
}
//# sourceMappingURL=storage.service.d.ts.map