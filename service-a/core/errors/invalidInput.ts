import { BaseException } from "./baseException";
import { ErrorCodesEnum } from "./codes";

export class InvalidInputException extends BaseException {
  constructor(description: string) {
    super(description, ErrorCodesEnum.INVALID_INPUT);
  }
}
