import { ParseError } from 'jet-validators/utils';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

export class RouteError extends Error {
  public status: HttpStatusCodes;

  public constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}

export class ValidationError extends RouteError {
  public static MESSAGE = 'Request validation failed';
  public errors: ParseError[];

  public constructor(errors: ParseError[]) {
    super(HttpStatusCodes.BAD_REQUEST, ValidationError.MESSAGE);
    this.errors = errors;
  }
}
