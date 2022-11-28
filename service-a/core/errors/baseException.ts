export class BaseException extends Error {
  code;

  constructor(description: string, code: string) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.code = code;
    Error.captureStackTrace(this);
  }
}
