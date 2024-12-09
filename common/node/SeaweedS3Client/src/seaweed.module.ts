import { DynamicModule, Module } from "@nestjs/common";
import { SeaweedOptions } from "./interfaces/seaweed-module-options";
import { StorageService } from "./services/storage.service";

@Module({})
export class SeaweedModule {
  static forRoot(options: SeaweedOptions): DynamicModule {
    const providers = [
      {
        provide: StorageService,
        useValue: new StorageService(options),
      },
    ];

    return {
      providers: providers,
      exports: providers,
      module: SeaweedModule,
    };
  }
}
