import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IMessage } from './errorMessage.interface';
import { sentryHandleError } from './sentry';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let httpStatus: number;
    let message: string;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      message = (exception.getResponse() as IMessage).message;
    } else {
      sentryHandleError(exception, httpAdapter, ctx);
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    const responseBody = {
      statusCode: httpStatus,
      message: message,
    };

    if (!(exception instanceof HttpException)) {
      sentryHandleError(exception, httpAdapter, ctx);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
