import { Module } from '@nestjs/common';
import { TwitterOauthModule } from 'nestjs-twitter-oauth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TwitterOauthModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                clientId: configService.get<string>('TWITTER_CLIENT_ID'),
                clientSecret: configService.get<string>('TWITTER_CLIENT_SECRET'),
                callbackUrl: configService.get<string>('TWITTER_CALLBACK_URL') || 'http://localhost:3000/auth/twitter/callback',
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
})
export class AppModule { }
