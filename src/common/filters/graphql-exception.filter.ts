import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): GraphQLError {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo();

    this.logger.warn(`HttpException [${info?.fieldName ?? 'unknown'}]: ${exception.message}`);

    const response = exception.getResponse();
    const message =
      typeof response === 'string'
        ? response
        : (((response as Record<string, unknown>)?.message as string | string[] | undefined) ??
          exception.message);

    return new GraphQLError(Array.isArray(message) ? message.join('; ') : message, {
      extensions: { code: exception.getStatus() }
    });
  }
}
