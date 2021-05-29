import { HttpError } from "routing-controllers";

export class ExtendedHttpError extends HttpError {
  public message: string;
  public code: string;
  public metaData: any[];

  constructor(message: string, code: string, metaData: any[] = []) {
    super(500);
    Object.setPrototypeOf(this, ExtendedHttpError.prototype);
    this.message = message;
    this.code = code;
    this.metaData = metaData; // can be used for internal logging
  }

  toJSON() {
    return {
      status: this.httpCode,
      code: this.code,
    };
  }
}
