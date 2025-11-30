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
exports.TwitterOauthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let TwitterOauthController = class TwitterOauthController {
    async twitterAuth(req) { }
    async twitterAuthRedirect(req, res) {
        console.log('Authenticated Twitter User:', req.user);
        res.json(req.user);
    }
};
exports.TwitterOauthController = TwitterOauthController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('twitter')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TwitterOauthController.prototype, "twitterAuth", null);
__decorate([
    (0, common_1.Get)('callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('twitter')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TwitterOauthController.prototype, "twitterAuthRedirect", null);
exports.TwitterOauthController = TwitterOauthController = __decorate([
    (0, common_1.Controller)('auth/twitter')
], TwitterOauthController);
//# sourceMappingURL=twitter-oauth.controller.js.map