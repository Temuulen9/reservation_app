// src/common/interceptors/transform.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from "@nestjs/common";
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { JsonWebTokenError } from "@nestjs/jwt";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errorDetails?: any;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Clean up null values and wrap in success format
        const cleanedData = this.cleanNullValues(data);

        // Wrap the success response
        return {
          success: true,
          //   message: 'Request completed successfully',
          data: cleanedData,
        };
      }),
      catchError((error) => {
        console.log(error);
        // Handle error responses with custom error structure
        const errorMessage = error.response?.message || "Internal Server Error";
        const errorDetails = error.response?.error || error;

        if (error instanceof JsonWebTokenError) {
          return throwError(
            () =>
              new UnauthorizedException({
                statusCode: 401,
                message: "Invalid or malformed token",
                error: "Unauthorized",
              })
          );
        }
        return throwError(
          () =>
            new HttpException(
              {
                success: false,
                message: errorMessage,
                errorDetails,
              },
              error.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR
            )
        );
      })
    );
  }

  // Clean up null values from the response
  private cleanNullValues(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.cleanNullValues(item));
    } else if (obj !== null && typeof obj === "object") {
      return Object.entries(obj)
        .filter(([_, v]) => v !== null)
        .reduce(
          (acc, [k, v]) => ({ ...acc, [k]: this.cleanNullValues(v) }),
          {}
        );
    }
    return obj;
  }
}
