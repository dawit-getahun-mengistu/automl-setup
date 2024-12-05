import { Injectable } from "@nestjs/common";
import {
  defaultRandomNumberServiceOptions,
  RandomNumberServiceOptions,
} from "../interfaces/random-number-service-options";

@Injectable()
export class RandomNumberService {
  private options: RandomNumberServiceOptions;

  constructor(options: Partial<RandomNumberServiceOptions>) {
    this.options = Object.assign(
      {},
      defaultRandomNumberServiceOptions,
      options
    );
  }

  generate(): number {
    const range = this.options.max - this.options.min;
    return this.options.min + Math.floor(Math.random() * range);
  }
}
