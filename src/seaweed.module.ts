import { DynamicModule, Module } from "@nestjs/common";
import { RandomNumberService } from "./services/random-number.service";
import { RandomNumberServiceOptions } from "./interfaces/random-number-service-options";

@Module({})
export class NestrandModule {
  static forRoot(options: Partial<RandomNumberServiceOptions>): DynamicModule {
    const providers = [
      {
        provide: RandomNumberService,
        useValue: new RandomNumberService(options),
      },
    ];

    return {
      providers: providers,
      exports: providers,
      module: NestrandModule,
    };
  }
}
