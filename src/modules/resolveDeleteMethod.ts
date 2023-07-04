import { users } from 'constants/users';
import { Code, ContentType, Message } from 'enums';
import { IncomingMessage, ServerResponse } from 'http';
import { getUrlId } from 'utils/getUrlId';
import { setResponse } from 'utils/setResponse';
import { validate } from 'uuid';

export function resolveDeleteMethod(req: IncomingMessage, res: ServerResponse): void {
  const userId = getUrlId(req.url);
  const isDeleted = users.deleteUser(userId);

  if (isDeleted) {
    return setResponse(res, Message.deleteUser, Code.successDelete, ContentType.text);
  }
  if (validate(userId)) {
    return setResponse(res, Message.userNotExist, Code.userError, ContentType.text);
  }
  return setResponse(res, Message.invalidId, Code.invalidData, ContentType.text);
}
