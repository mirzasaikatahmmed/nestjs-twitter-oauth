"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TwitterOauthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterOauthModule = void 0;
const common_1 = require("@nestjs/common");
const twitter_oauth_strategy_1 = require("./twitter-oauth.strategy");
const twitter_oauth_controller_1 = require("./twitter-oauth.controller");
const session_serializer_1 = require("./session.serializer");
const passport_1 = require("@nestjs/passport");
let TwitterOauthModule = TwitterOauthModule_1 = class TwitterOauthModule {
    static register(options) {
        return {
            module: TwitterOauthModule_1,
            imports: [passport_1.PassportModule.register({ session: true })],
            controllers: [twitter_oauth_controller_1.TwitterOauthController],
            providers: [
                {
                    provide: 'TWITTER_OAUTH_OPTIONS',
                    useValue: options,
                },
                twitter_oauth_strategy_1.TwitterOauthStrategy,
                session_serializer_1.SessionSerializer,
            ],
            exports: [twitter_oauth_strategy_1.TwitterOauthStrategy, session_serializer_1.SessionSerializer],
        };
    }
    static registerAsync(options) {
        return {
            module: TwitterOauthModule_1,
            imports: [
                ...options.imports || [],
                passport_1.PassportModule.register({ session: true }),
            ],
            controllers: [twitter_oauth_controller_1.TwitterOauthController],
            providers: [
                ...this.createAsyncProviders(options),
                twitter_oauth_strategy_1.TwitterOauthStrategy,
                session_serializer_1.SessionSerializer,
            ],
            exports: [twitter_oauth_strategy_1.TwitterOauthStrategy, session_serializer_1.SessionSerializer],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: 'TWITTER_OAUTH_OPTIONS',
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: 'TWITTER_OAUTH_OPTIONS',
            useFactory: async (optionsFactory) => await optionsFactory.createTwitterOauthOptions(),
            inject: [options.useExisting || options.useClass],
        };
    }
};
exports.TwitterOauthModule = TwitterOauthModule;
exports.TwitterOauthModule = TwitterOauthModule = TwitterOauthModule_1 = __decorate([
    (0, common_1.Module)({})
], TwitterOauthModule);
//# sourceMappingURL=twitter-oauth.module.js.map