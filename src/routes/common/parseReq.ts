import { parseObject, Schema } from 'jet-validators/utils';

import { ValidationError } from '@src/common/utils/route-errors';

function parseReq<U extends Schema>(schema: U) {
  return parseObject(schema, (errors) => {
    throw new ValidationError(errors);
  });
}

export default parseReq;
