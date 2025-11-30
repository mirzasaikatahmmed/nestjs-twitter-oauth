import { Module, DynamicModule, Provider } from '@nestjs/common';
import { TwitterOauthStrategy } from './twitter-oauth.strategy';
import { TwitterOauthController } from './twitter-oauth.controller';
import { SessionSerializer } from './session.serializer';
import { TwitterOauthOptions, TwitterOauthAsyncOptions, TwitterOauthOptionsFactory } from './interfaces/twitter-oauth-options.interface';
import { PassportModule } from '@nestjs/passport';

@Module({})
export class TwitterOauthModule {
    static register(options: TwitterOauthOptions): DynamicModule {
        return {
            module: TwitterOauthModule,
            imports: [PassportModule.register({ session: true })],
            controllers: [TwitterOauthController],
            providers: [
                {
                    provide: 'TWITTER_OAUTH_OPTIONS',
                    useValue: options,
                },
                TwitterOauthStrategy,
                SessionSerializer,
            ],
            exports: [TwitterOauthStrategy, SessionSerializer],
        };
    }

    static registerAsync(options: TwitterOauthAsyncOptions): DynamicModule {
        return {
            module: TwitterOauthModule,
            imports: [
                ...options.imports || [],
                PassportModule.register({ session: true }),
            ],
            controllers: [TwitterOauthController],
            providers: [
                ...this.createAsyncProviders(options),
                TwitterOauthStrategy,
                SessionSerializer,
            ],
            exports: [TwitterOauthStrategy, SessionSerializer],
        };
    }

    private static createAsyncProviders(options: TwitterOauthAsyncOptions): Provider[] {
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

    private static createAsyncOptionsProvider(options: TwitterOauthAsyncOptions): Provider {
        if (options.useFactory) {
            return {
                provide: 'TWITTER_OAUTH_OPTIONS',
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: 'TWITTER_OAUTH_OPTIONS',
            useFactory: async (optionsFactory: TwitterOauthOptionsFactory) =>
                await optionsFactory.createTwitterOauthOptions(),
            inject: [options.useExisting || options.useClass],
        };
    }
}
