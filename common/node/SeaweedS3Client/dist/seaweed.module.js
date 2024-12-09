"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SeaweedModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeaweedModule = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("./services/storage.service");
let SeaweedModule = SeaweedModule_1 = class SeaweedModule {
    static forRoot(options) {
        const providers = [
            {
                provide: storage_service_1.StorageService,
                useValue: new storage_service_1.StorageService(options),
            },
        ];
        return {
            providers: providers,
            exports: providers,
            module: SeaweedModule_1,
        };
    }
};
exports.SeaweedModule = SeaweedModule;
exports.SeaweedModule = SeaweedModule = SeaweedModule_1 = __decorate([
    (0, common_1.Module)({})
], SeaweedModule);
//# sourceMappingURL=seaweed.module.js.map