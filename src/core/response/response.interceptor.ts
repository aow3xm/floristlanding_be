import {CallHandler, ExecutionContext, Injectable, NestInterceptor,} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response & { statusCode: number }>();

    return next.handle().pipe(
      map((data) => ({
        status: 'OK',
        statusCode: `HTTP_${response.statusCode}`,
        timestamp: new Date().toISOString(),
        path: request.url,
        data,
      })),
    );
  }
}
