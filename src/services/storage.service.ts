import { Injectable } from "@nestjs/common";
import { SeaweedOptions } from "../interfaces/seaweed-module-options";
import { S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class StorageService {
  private client: S3Client;

  constructor(private options: SeaweedOptions) {
    this.createConnection();
    console.log(this.client);
  }

  private createConnection() {
    this.client = new S3Client({
      credentials: {
        accessKeyId: this.options.access_key,
        secretAccessKey: this.options.secret_key,
      },
      endpoint: this.options.s3_endpoint,
    });
  }
}
