import { Strategy } from '@superfaceai/passport-twitter-oauth2';
import { TwitterOauthOptions } from './interfaces/twitter-oauth-options.interface';
declare const TwitterOauthStrategy_base: new (...args: any[]) => Strategy;
export declare class TwitterOauthStrategy extends TwitterOauthStrategy_base {
    constructor(options: TwitterOauthOptions);
    validate(accessToken: string, refreshToken: string, profile: any, done: (err: any, user: any, info?: any) => void): Promise<any>;
}
export {};
