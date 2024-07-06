import { Prisma } from '@prisma/client';

const DELETE_ACTION = 'delete';
const DELETE_MANY_ACTION = 'deleteMany';
const UPDATE_ACTION = 'update';
const UPDATE_MANY_ACTION = 'updateMany';
const DATA_FIELD = 'data';
const DELETED_AT_FIELD = 'deletedAt';

export function softDeleteMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    if (params.action === DELETE_ACTION) {
      params.action = UPDATE_ACTION;
      params.args[DATA_FIELD] = { [DELETED_AT_FIELD]: new Date() };
    }
    if (params.action === DELETE_MANY_ACTION) {
      params.action = UPDATE_MANY_ACTION;
      if (params.args[DATA_FIELD] != undefined) {
        params.args[DATA_FIELD][DELETED_AT_FIELD] = new Date();
      } else {
        params.args[DATA_FIELD] = { [DELETED_AT_FIELD]: new Date() };
      }
    }
    return next(params);
  };
}
