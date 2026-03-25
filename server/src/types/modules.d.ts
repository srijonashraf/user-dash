declare module "express-rate-limit" {
  import type { RequestHandler, Request, Response, NextFunction } from "express";

  type ValueDeterminingMiddleware<T> = (
    request: Request,
    response: Response,
  ) => T | Promise<T>;

  type RateLimitExceededEventHandler = (
    request: Request,
    response: Response,
    next: NextFunction,
    optionsUsed: Options,
  ) => void;

  interface Options {
    windowMs: number;
    limit: number | ValueDeterminingMiddleware<number>;
    message: any | ValueDeterminingMiddleware<any>;
    statusCode: number;
    legacyHeaders: boolean;
    standardHeaders: boolean | string;
    identifier: string | ValueDeterminingMiddleware<string>;
    requestPropertyName: string;
    skipFailedRequests: boolean;
    skipSuccessfulRequests: boolean;
    keyGenerator: ValueDeterminingMiddleware<string>;
    ipv6Subnet: number | false | ValueDeterminingMiddleware<number>;
    handler: RateLimitExceededEventHandler;
    skip: ValueDeterminingMiddleware<boolean>;
    requestWasSuccessful: ValueDeterminingMiddleware<boolean>;
    store: any;
    validate: boolean | Record<string, boolean>;
    max?: number | ValueDeterminingMiddleware<number>;
    passOnStoreError: boolean;
  }

  type RateLimitRequestHandler = RequestHandler & {
    resetKey: (key: string) => void;
    getKey: (
      key: string,
    ) =>
      | Promise<{ totalHits: number; resetTime: Date | undefined } | undefined>
      | { totalHits: number; resetTime: Date | undefined }
      | undefined;
  };

  declare function rateLimit(
    passedOptions?: Partial<Options>,
  ): RateLimitRequestHandler;
  export default rateLimit;
  export { rateLimit, Options, RateLimitRequestHandler };
}
