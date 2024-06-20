import { Injectable } from '@nestjs/common';
import {Request, Response} from "express";

enum Key{
    ACCESS_TOKEN = 'ACCESS_TOKEN'
}
@Injectable()
export class CookieService {
    getAccessToken(request: Request): Promise<string> {
        return Promise.resolve(request.cookies[Key.ACCESS_TOKEN]);
    }

    setAccessToken(response: Response, token: string): Promise<void> {
        response.cookie(Key.ACCESS_TOKEN, token);
        return Promise.resolve();
    }

    deleteAccessToken(response: Response): void {
        response.clearCookie(Key.ACCESS_TOKEN);
    }
}
