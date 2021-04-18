import * as Sentry from "@sentry/node";
import { Context, Next } from "koa";
import { Middleware, KoaMiddlewareInterface } from "routing-controllers";

@Middleware({ type: "before" })
export class ErrorLoggingMiddleware implements KoaMiddlewareInterface {
  async use(ctx: Context, next: Next): Promise<void> {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message,
      };
      Sentry.withScope(function (scope) {
        scope.addEventProcessor(function (event) {
          return Sentry.Handlers.parseRequest(event, ctx.request);
        });
        Sentry.captureException(err);
      });
    }
  }
}
