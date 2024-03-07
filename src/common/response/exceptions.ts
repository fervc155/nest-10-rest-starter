import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as MyResponse from './index';
import { APP_FILTER } from '@nestjs/core';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() || HttpStatus.NOT_FOUND;
    const msg = exception.message || 'Not Found';

    response.status(status).json({
      code: status,
      status:false,
      msg,
    });
  }
}


@Catch(Error)
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message || 'Internal Server Error';

    response.status(500).json({
      status: false,
      code:500,
      msg: message,
      data: exception
    });
  }
}

export const filters=()=>{
  return [

    {
      provide: APP_FILTER,
      useClass: InternalServerErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    }
  ]
}