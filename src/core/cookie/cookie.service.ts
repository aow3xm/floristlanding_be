import {Injectable} from '@nestjs/common';
import {Request, Response} from 'express';

enum CookieKey {
    ACCESS_TOKEN = 'access_token',
}

@Injectable()
export class CookieService {
    private readonly isProduction: boolean;

    constructor() {
        this.isProduction = process.env.NODE_ENV === 'production';
    }

    getAccessToken(request: Request): Promise<string> {
        return Promise.resolve(request.cookies[CookieKey.ACCESS_TOKEN]);
    }

    setAccessToken(response: Response, token: string): Promise<void> {
        const cookieOptions = {
            httpOnly: true,
            secure: this.isProduction,
            sameSite: this.isProduction ? 'strict' as const : 'lax' as const,
            maxAge: 3600000, // 1 hour
        };

        response.cookie(CookieKey.ACCESS_TOKEN, token, cookieOptions);
        return Promise.resolve();
    }

    deleteAccessToken(response: Response): Promise<void> {
        response.clearCookie(CookieKey.ACCESS_TOKEN);
        return Promise.resolve();
    }
}