import { ValueOf } from 'jet-validators';

const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,

  BAD_REQUEST: 400,
  NOT_FOUND: 404,

  TOO_MANY_REQUESTS: 429,

  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

type HttpStatusCodes = ValueOf<typeof HttpStatusCodes>;
export default HttpStatusCodes;
