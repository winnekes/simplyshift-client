import * as Sentry from "@sentry/node";
import { Context, Next } from "koa";
import { Middleware, KoaMiddlewareInterface } from "routing-controllers";

// todo add logger middleware
// todo should handle all errors here? *not catch locally in controller for example)
@Middleware({ type: "before" })
export class ErrorLoggingMiddleware implements KoaMiddlewareInterface {
  async use(ctx: Context, next: Next): Promise<void> {
    try {
      await next();
    } catch (err) {
      console.dir(err, { depth: null });
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message || " Something went wrong",
        code: err.code,
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
