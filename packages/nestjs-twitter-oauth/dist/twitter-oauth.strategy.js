"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterOauthStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_twitter_oauth2_1 = require("@superfaceai/passport-twitter-oauth2");
let TwitterOauthStrategy = class TwitterOauthStrategy extends (0, passport_1.PassportStrategy)(passport_twitter_oauth2_1.Strategy, 'twitter') {
    constructor(options) {
        super({
            clientID: options.clientId,
            clientSecret: options.clientSecret,
            callbackURL: options.callbackUrl,
            scope: ['users.read', 'tweet.read'],
            clientType: 'confidential',
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        const username = profile.username || (profile === null || profile === void 0 ? void 0 : profile.username) || (profile === null || profile === void 0 ? void 0 : profile.screen_name) || (profile === null || profile === void 0 ? void 0 : profile.id);
        const displayName = profile.displayName || (profile === null || profile === void 0 ? void 0 : profile.name) || (profile === null || profile === void 0 ? void 0 : profile.display_name) || username;
        const user = {
            username: String(username),
            displayName: String(displayName),
            accessToken,
            refreshToken,
            profile,
        };
        done(null, user);
    }
};
exports.TwitterOauthStrategy = TwitterOauthStrategy;
exports.TwitterOauthStrategy = TwitterOauthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TWITTER_OAUTH_OPTIONS')),
    __metadata("design:paramtypes", [Object])
], TwitterOauthStrategy);
//# sourceMappingURL=twitter-oauth.strategy.js.map