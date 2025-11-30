import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/twitter')
export class TwitterOauthController {
    @Get()
    @UseGuards(AuthGuard('twitter'))
    async twitterAuth(@Req() req) { }

    @Get('callback')
    @UseGuards(AuthGuard('twitter'))
    async twitterAuthRedirect(@Req() req, @Res() res) {
        // User is already validated by the strategy and serialized into session
        // Redirect or return user
        console.log('Authenticated Twitter User:', req.user);
        res.json(req.user);
    }
}
