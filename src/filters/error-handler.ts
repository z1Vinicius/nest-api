import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class HttpExceptionHandler implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private nativeLogger: ConsoleLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    this.nativeLogger.error(exception);
    const { httpAdapter } = this.adapterHost;
    const context = host.switchToHttp();
    const response = context.getResponse<Response>(); // Changed getRequest to getResponse
    const request = context.getRequest<Request>(); // Changed getRequest to getResponse

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: { message: exception.getResponse() },
          }
        : {
            status: 500,
            body: {
              statusCode: 500,
              message: 'Internal server error',
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(request),
            },
          };

    httpAdapter.reply(
      response,
      {
        ...body,
        timestamp: new Date().toISOString(),
        path: context.getRequest().url,
      },
      status,
    );
  }
}

export default HttpExceptionHandler;
