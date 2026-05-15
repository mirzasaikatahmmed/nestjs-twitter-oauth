import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getHome(): string {
        return `
      <h1>NestJS Twitter OAuth Test App</h1>
      <a href="/auth/twitter">Login with Twitter</a>
    `;
    }

    @Get('profile')
    getProfile(@Req() req) {
        if (!req.user) {
            return 'No user logged in. <a href="/auth/twitter">Login</a>';
        }
        return `
      <h1>User Profile</h1>
      <pre>${JSON.stringify(req.user, null, 2)}</pre>
      <br>
      <a href="/">Home</a>
    `;
    }
}
