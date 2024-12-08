import { SeaweedOptions } from "../interfaces/seaweed-module-options";
export declare class StorageService {
    private options;
    private client;
    constructor(options: SeaweedOptions);
    private createConnection;
    listBuckets(): Promise<import("@aws-sdk/client-s3").Bucket[]>;
    createBucket(bucketName: string): Promise<boolean>;
    deleteBucket(bucketName: string): Promise<boolean>;
    uploadFile(bucketName: string, objectName: string, file: Buffer): Promise<string>;
    deleteObject(bucketName: string, objectName: string): Promise<boolean>;
    downloadObject(bucketName: string, objectName: string): Promise<Buffer<ArrayBuffer>>;
    getPresignedDownloadUrl(bucketName: string, objectName: string, expiresIn?: number): Promise<string>;
    getPresignedUploadUrl(bucketName: string, objectName: string, expiresIn?: number): Promise<string>;
}
//# sourceMappingURL=storage.service.d.ts.map