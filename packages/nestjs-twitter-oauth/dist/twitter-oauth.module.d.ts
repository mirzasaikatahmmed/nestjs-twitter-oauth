import { DynamicModule } from '@nestjs/common';
import { TwitterOauthOptions, TwitterOauthAsyncOptions } from './interfaces/twitter-oauth-options.interface';
export declare class TwitterOauthModule {
    static register(options: TwitterOauthOptions): DynamicModule;
    static registerAsync(options: TwitterOauthAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
