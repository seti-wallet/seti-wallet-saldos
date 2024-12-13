import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
  } from '@nestjs/common';
  import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
  import { ThrottlerException } from '@nestjs/throttler';
   
  @Catch(ThrottlerException)
  export class ThrottlerExceptionFilter implements ExceptionFilter {
    catch(exception: ThrottlerException, host: ArgumentsHost) {
      const ctx = new ExecutionContextHost(host.getArgs());
      const request = ctx.switchToHttp().getRequest();
      const response = ctx.switchToHttp().getResponse();
      const clientIp = request.ip.includes('::1') ? '127.0.0.1' : request.ip;
      response.status(HttpStatus.TOO_MANY_REQUESTS).json({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message:
          //'You have reached the maximum number of requests. Please wait before trying again.',
          'Matanga, ya utilizo todos los intentos de conexión, que piensa que me va a tumbar el servicio.',
        method: request.method,
        clientIp,
        timestamp: new Date().toISOString(),
      });
    }
  }