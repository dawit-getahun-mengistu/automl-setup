"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let StorageService = class StorageService {
    constructor(options) {
        this.options = options;
        this.createConnection();
    }
    createConnection() {
        this.client = new client_s3_1.S3({
            credentials: {
                accessKeyId: this.options.access_key,
                secretAccessKey: this.options.secret_key,
            },
            endpoint: this.options.s3_endpoint,
            region: "us-east-1",
            logger: console,
            forcePathStyle: true,
        });
    }
    async listBuckets() {
        try {
            const response = await this.client.listBuckets();
            return response.Buckets;
        }
        catch (error) {
            console.error(`Error listing buckets: ${error}`);
            throw error;
        }
    }
    async createBucket(bucketName) {
        try {
            const response = await this.client.createBucket({
                Bucket: bucketName,
            });
            return response;
        }
        catch (error) {
            console.log(`Error creating bucket ${bucketName}: ${error}`);
            throw error;
        }
    }
    async deleteBucket(bucketName) {
        try {
            const response = await this.client.deleteBucket({ Bucket: bucketName });
            return response;
        }
        catch (error) {
            console.error(`Error deleting bucket ${bucketName}:`, error);
            throw error;
        }
    }
    async uploadFile(bucketName, objectName, file) {
        try {
            const response = await this.client.putObject({
                Bucket: bucketName,
                Key: objectName,
                Body: file,
            });
            return response;
        }
        catch (error) {
            console.error(`Error uploading file ${objectName} to bucket ${bucketName}:`, error);
            throw error;
        }
    }
    async deleteObject(bucketName, objectName) {
        try {
            const response = await this.client.deleteObject({
                Bucket: bucketName,
                Key: objectName,
            });
            return response;
        }
        catch (error) {
            console.error(`Error deleting object ${objectName} from bucket ${bucketName}:`, error);
            throw error;
        }
    }
    async downloadObject(bucketName, objectName) {
        try {
            const response = await this.client.getObject({
                Bucket: bucketName,
                Key: objectName,
            });
            // Return the Readable stream
            return response.Body;
        }
        catch (error) {
            console.error(`Error downloading object ${objectName} from bucket ${bucketName}:`, error);
            throw error;
        }
    }
    async getPresignedDownloadUrl(bucketName, objectName, expiresIn = 3600) {
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: bucketName,
                Key: objectName,
            });
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.client, command, { expiresIn });
            return url;
        }
        catch (error) {
            console.error(`Error generating presigned download URL for ${objectName}:`, error);
            throw error;
        }
    }
    async getPresignedUploadUrl(bucketName, objectName, expiresIn = 3600) {
        try {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: bucketName,
                Key: objectName,
            });
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.client, command, { expiresIn });
            return url;
        }
        catch (error) {
            console.error(`Error generating presigned upload URL for ${objectName}:`, error);
            throw error;
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], StorageService);
//# sourceMappingURL=storage.service.js.map