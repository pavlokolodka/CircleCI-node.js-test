import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

export function sentryHandleError(
  exception: unknown,
  httpAdapter: AbstractHttpAdapter<any, any, any>,
  ctx: HttpArgumentsHost,
) {
  Sentry.captureException(exception);

  const transaction = Sentry.startTransaction({
    op: 'http',
    name: 'Unhandled error',
    data: {
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      exception,
      timestamp: new Date().toISOString(),
    },
  });

  transaction.finish();
}
