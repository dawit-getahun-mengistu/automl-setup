import { Injectable } from "@nestjs/common";
import { SeaweedOptions } from "../interfaces/seaweed-module-options";

@Injectable()
export class StorageService {
  constructor(private options: SeaweedOptions) {
    this.createConnection();
  }

  private createConnection() {
    console.log(this.options);
  }
}
