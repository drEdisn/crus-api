import { users } from 'constants/users';
import { Code, ContentType, Message, Requests } from 'enums';
import { IncomingMessage, ServerResponse } from 'http';
import { setResponse } from 'utils/setResponse';
import { getUrlId } from 'utils/getUrlId';
import { validate } from 'uuid';

export function resolveGetMethod(req: IncomingMessage, res: ServerResponse): void {
  if (req.url === Requests.users) {
    return setResponse(res, users.getAll(), Code.success, ContentType.json);
  }

  const userId = getUrlId(req.url);
  const user = users.getUser(userId);

  if (user) {
    return setResponse(res, user, Code.success, ContentType.json);
  }
  if (validate(userId)) {
    return setResponse(res, Message.userNotExist, Code.userError, ContentType.text);
  }
  return setResponse(res, Message.invalidId, Code.invalidData, ContentType.text);
}
