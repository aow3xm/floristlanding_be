import {Request} from 'express'

export namespace RequestHelper {
    export const getRequest = async (request: Request): Promise<string> => {
        return request?.path;
    }

    export const getBody = async (request: Request): Promise<string> => {
        return request?.body;
    }

    export const getMethod = async (request: Request): Promise<any> => {
        return request?.method
    }

    export const getAuthorization = async (request: Request): Promise<string> => {
        const token = request.headers?.['authorization'];
        return token.replace('Bearer ', '')?.trim()
    }
}