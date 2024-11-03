import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class HttpExceptionHandler implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();  // Changed getRequest to getResponse
    
    const { status, body } = 
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: {message: exception.getResponse()}
          }
        : {
            status: 500,
            body: {
              statusCode: 500,
              message: "Internal server error",
              timestamp: new Date().toISOString(),
              path: context.getRequest().url
            }
          };

    response
      .status(status)
      .json({
        ...body,
        timestamp: new Date().toISOString(),
        path: context.getRequest().url
      });
  }
}

export default HttpExceptionHandler;