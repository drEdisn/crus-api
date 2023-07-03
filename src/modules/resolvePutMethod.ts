import { User, users } from 'constants/users';
import { Code, ContentType, Message } from 'enums';
import { IncomingMessage, ServerResponse } from 'http';
import { checkUserBody } from 'utils/checkUserBody';
import { getUrlId } from 'utils/getUrlId';
import { setResponse } from 'utils/setResponse';
import { validate } from 'uuid';

function getResult(
  userBody: User | null,
  isValid: boolean,
  userId: string,
  res: ServerResponse
): void {
  if (userBody && isValid) {
    const newUser = users.updateUser(userId, userBody);
    if (newUser) {
      return setResponse(res, newUser, Code.success, ContentType.json);
    }

    return setResponse(res, Message.userNotExist, Code.userError, ContentType.text);
  }
  if (userBody) {
    return setResponse(res, Message.invalidId, Code.invalidData, ContentType.text);
  }
  if (isValid) {
    return setResponse(res, Message.invalidBody, Code.invalidData, ContentType.text);
  }
  return setResponse(res, Message.userNotExist, Code.userError, ContentType.text);
}

export function resolvePutMethod(req: IncomingMessage, res: ServerResponse): void {
  const userId = getUrlId(req.url);
  let body: string;

  req.on('data', (chunk) => {
    body = chunk;
  });

  req.on('close', () => {
    let userBody: User | null = null;
    try {
      userBody = JSON.parse(body);
      if (checkUserBody(userBody)) userBody = null;
    } catch {
      return setResponse(res, Message.incorrectJSONFormat, Code.serverError, ContentType.text);
    }

    const isValid = validate(userId);
    getResult(userBody, isValid, userId, res);
  });
}
