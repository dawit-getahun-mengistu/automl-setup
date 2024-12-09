import { Injectable } from "@nestjs/common";
import {
  S3Client,
  ListBucketsCommand,
  CreateBucketCommand,
  DeleteBucketCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { SeaweedOptions } from "../interfaces/seaweed-module-options";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";

@Injectable()
export class StorageService {
  private client: S3Client;

  constructor(private options: SeaweedOptions) {
    this.createConnection();
  }

  private createConnection() {
    this.client = new S3Client({
      credentials: {
        accessKeyId: this.options.access_key,
        secretAccessKey: this.options.secret_key,
      },
      endpoint: this.options.s3_endpoint,
      region: "NONE",
      logger: console,
    });
  }

  async listBuckets() {
    try {
      const command = new ListBucketsCommand({});
      const response = await this.client.send(command);
      return response.Buckets;
    } catch (error) {
      throw new Error(`Failed to list buckets: ${error}`);
    }
  }

  async createBucket(bucketName: string) {
    const command = new CreateBucketCommand({ Bucket: bucketName });
    await this.client.send(command);
    return true;
  }

  async deleteBucket(bucketName: string) {
    try {
      const command = new DeleteBucketCommand({ Bucket: bucketName });
      await this.client.send(command);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete bucket: ${error}`);
    }
  }

  async uploadFile(bucketName: string, objectName: string, file: Buffer) {
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectName,
        Body: file,
      });
      await this.client.send(command);
      return `s3://${bucketName}/${objectName}`;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error}`);
    }
  }

  async deleteObject(bucketName: string, objectName: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });
      await this.client.send(command);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete object: ${error}`);
    }
  }

  async downloadObject(bucketName: string, objectName: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });
      const response = await this.client.send(command);
      const stream = response.Body as Readable;
      const chunks = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      return Buffer.concat(chunks);
    } catch (error) {
      throw new Error(`Failed to download object: ${error}`);
    }
  }

  async getPresignedDownloadUrl(
    bucketName: string,
    objectName: string,
    expiresIn: number = 3600
  ) {
    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });
      return await getSignedUrl(this.client, command, { expiresIn });
    } catch (error) {
      throw new Error(`Failed to generate presigned download URL: ${error}`);
    }
  }

  async getPresignedUploadUrl(
    bucketName: string,
    objectName: string,
    expiresIn: number = 3600
  ) {
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });
      const response = await await getSignedUrl(this.client, command, {
        expiresIn: expiresIn,
        signingDate: new Date(),
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to generate presigned upload URL: ${error}`);
    }
  }
}
