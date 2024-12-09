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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
        this.client = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: this.options.access_key,
                secretAccessKey: this.options.secret_key,
            },
            endpoint: this.options.s3_endpoint,
            region: "NONE",
        });
    }
    async listBuckets() {
        try {
            const command = new client_s3_1.ListBucketsCommand({});
            const response = await this.client.send(command);
            return response.Buckets;
        }
        catch (error) {
            throw new Error(`Failed to list buckets: ${error}`);
        }
    }
    async createBucket(bucketName) {
        const command = new client_s3_1.CreateBucketCommand({ Bucket: bucketName });
        await this.client.send(command);
        return true;
    }
    async deleteBucket(bucketName) {
        try {
            const command = new client_s3_1.DeleteBucketCommand({ Bucket: bucketName });
            await this.client.send(command);
            return true;
        }
        catch (error) {
            throw new Error(`Failed to delete bucket: ${error}`);
        }
    }
    async uploadFile(bucketName, objectName, file) {
        try {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: bucketName,
                Key: objectName,
                Body: file,
            });
            await this.client.send(command);
            return `s3://${bucketName}/${objectName}`;
        }
        catch (error) {
            throw new Error(`Failed to upload file: ${error}`);
        }
    }
    async deleteObject(bucketName, objectName) {
        try {
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: bucketName,
                Key: objectName,
            });
            await this.client.send(command);
            return true;
        }
        catch (error) {
            throw new Error(`Failed to delete object: ${error}`);
        }
    }
    async downloadObject(bucketName, objectName) {
        var _a, e_1, _b, _c;
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: bucketName,
                Key: objectName,
            });
            const response = await this.client.send(command);
            const stream = response.Body;
            const chunks = [];
            try {
                for (var _d = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = await stream_1.next(), _a = stream_1_1.done, !_a; _d = true) {
                    _c = stream_1_1.value;
                    _d = false;
                    const chunk = _c;
                    chunks.push(chunk);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = stream_1.return)) await _b.call(stream_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return Buffer.concat(chunks);
        }
        catch (error) {
            throw new Error(`Failed to download object: ${error}`);
        }
    }
    async getPresignedDownloadUrl(bucketName, objectName, expiresIn = 3600) {
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: bucketName,
                Key: objectName,
            });
            return await (0, s3_request_presigner_1.getSignedUrl)(this.client, command, { expiresIn });
        }
        catch (error) {
            throw new Error(`Failed to generate presigned download URL: ${error}`);
        }
    }
    async getPresignedUploadUrl(bucketName, objectName, expiresIn = 3600) {
        try {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: bucketName,
                Key: objectName,
            });
            const response = await await (0, s3_request_presigner_1.getSignedUrl)(this.client, command, {
                expiresIn: expiresIn,
                signingDate: new Date(),
            });
            return response;
        }
        catch (error) {
            throw new Error(`Failed to generate presigned upload URL: ${error}`);
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], StorageService);
//# sourceMappingURL=storage.service.js.map