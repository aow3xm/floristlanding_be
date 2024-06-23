import {ArgumentsHost, Catch, ExceptionFilter as NestExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            message = exception.message;
        }

        response.status(status).json({
            status: 'failed',
            timestamp: new Date().toISOString(),
            path: request.url,
            data: null,
            message: message
        });
    }
}
