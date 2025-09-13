import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errorType = 'Error';

        // Handle NestJS HTTP exceptions
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message =
                typeof res === 'string'
                    ? res
                    : (res as any).message || exception.message;
            errorType = exception.name;
        }
        // Handle TypeORM query errors
        else if (exception instanceof QueryFailedError) {
            message = (exception as any).message;
            errorType = 'DatabaseError';
        }
        // Handle generic errors
        else if (exception instanceof Error) {
            message = exception.message;
            errorType = exception.name;
        }

        response.status(status).json({
            statusCode: status,
            error: errorType,
            message,
            timestamp: new Date().toISOString(),
        });
    }
}
