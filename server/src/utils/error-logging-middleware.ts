import * as Sentry from "@sentry/node";
import { Context, Next } from "koa";
import { Middleware, KoaMiddlewareInterface } from "routing-controllers";

// todo add logger middleware
@Middleware({ type: "before" })
export class ErrorLoggingMiddleware implements KoaMiddlewareInterface {
  async use(ctx: Context, next: Next): Promise<void> {
    try {
      await next();
    } catch (err) {
      console.dir(err, { depth: null });
      //  console.log({ details: JSON.stringify(err.errors, null, 2) });
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
