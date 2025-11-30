# NestJS Twitter OAuth

[![NPM Version](https://img.shields.io/npm/v/nestjs-twitter-oauth.svg)](https://www.npmjs.com/package/nestjs-twitter-oauth)
[![License](https://img.shields.io/npm/l/nestjs-twitter-oauth.svg)](https://github.com/mirzasaikatahmmed/nestjs-twitter-oauth/blob/main/LICENSE)
[![Build Status](https://github.com/mirzasaikatahmmed/nestjs-twitter-oauth/actions/workflows/ci-publish.yml/badge.svg)](https://github.com/mirzasaikatahmmed/nestjs-twitter-oauth/actions)

A simple, robust, and easy-to-use NestJS package for integrating Twitter OAuth 2.0 authentication using `@superfaceai/passport-twitter-oauth2`.

## Features

- 🚀 **Easy Integration**: Plug and play with your NestJS application.
- 🔒 **Secure**: Built on top of `@superfaceai/passport-twitter-oauth2`.
- ⚙️ **Configurable**: Supports asynchronous configuration (e.g., using `@nestjs/config`).
- 📦 **Session Support**: Built-in session serialization.
- 🧩 **Type Safe**: Written in TypeScript with full type definitions.

## Installation

```bash
npm install nestjs-twitter-oauth
```

(Note: All necessary dependencies like `@nestjs/passport`, `passport`, etc. are installed automatically)

## Author

- **Name**: Mirza Saikat Ahmmed
- **Github**: [https://github.com/mirzasaikatahmmed](https://github.com/mirzasaikatahmmed)
- **Website**: [https://saikat.com.bd](https://saikat.com.bd)
- **Email**: [contact@saikat.com.bd](mailto:contact@saikat.com.bd)

## Usage

### 1. Configure Environment Variables

Create a `.env` file in your project root:

```env
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
TWITTER_CALLBACK_URL=http://localhost:3000/auth/twitter/callback
```

### 2. Import the Module

Import `TwitterOauthModule` in your `AppModule`. We recommend using `registerAsync` with `@nestjs/config` to securely load credentials.

```typescript
import { Module } from '@nestjs/common';
import { TwitterOauthModule } from 'nestjs-twitter-oauth';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        callbackUrl: configService.get<string>('TWITTER_CALLBACK_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

### 3. Setup Session in `main.ts`

Ensure you configure `express-session` and `passport` in your `main.ts` file:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'your-secret-key', // Change this!
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
```

### 4. Test It!

Start your application and navigate to:
`http://localhost:3000/auth/twitter`

You will be redirected to Twitter to authorize the app. Upon success, you will be redirected back to your callback URL (default: `/auth/twitter/callback`) and receive the user profile data.

## Configuration Options

The `register` and `registerAsync` methods accept the following options:

| Option | Type | Description |
| --- | --- | --- |
| `clientId` | `string` | Your Twitter Client ID. |
| `clientSecret` | `string` | Your Twitter Client Secret. |
| `callbackUrl` | `string` | The URL to redirect to after Twitter Authorization. |

## License

MIT
