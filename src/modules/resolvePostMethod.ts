import { User, users } from 'constants/users';
import { Code, ContentType, Message } from 'enums';
import { IncomingMessage, ServerResponse } from 'http';
import { checkUserBody } from 'utils/checkUserBody';
import { setResponse } from 'utils/setResponse';

export function resolvePostMethod(req: IncomingMessage, res: ServerResponse): void {
  let body: string;

  req.on('data', (chunk) => {
    body = chunk;
  });

  req.on('end', () => {
    let userBody: User | null = null;
    try {
      userBody = JSON.parse(body);
      if (checkUserBody(userBody)) userBody = null;
    } catch {
      return setResponse(res, Message.incorrectJSONFormat, Code.serverError, ContentType.text);
    }

    if (userBody) {
      return setResponse(res, users.createUser(userBody), Code.successCreate, ContentType.json);
    }
    return setResponse(res, Message.invalidBody, Code.invalidData, ContentType.text);
  });
}
