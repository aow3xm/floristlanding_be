import { ArgumentsHost, Catch, ExceptionFilter as NestExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

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

        let message = 'Internal server error.';

        if (exception instanceof HttpException) {
            const response = exception.getResponse();
            if (typeof response === 'string') {
                message = response;
            } else if (typeof response === 'object' && response !== null) {
                message = (response as any).message || message;
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        response.status(status).json({
            status: 'FAILED',
            statusCode: `HTTP_${status}`,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url,
            data: null,
        });
    }
}
