import { ContentType } from 'enums';
import { ServerResponse } from 'http';

export function setResponse(
  res: ServerResponse,
  message: unknown,
  code: number,
  header: ContentType,
): void {
  res.writeHead(
    code,
    { 'Content-Type': header },
  );
  res.write(JSON.stringify(message));
  res.end();
}
