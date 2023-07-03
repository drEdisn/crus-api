import 'dotenv/config';
import http from 'http';
import { Methods, methods } from 'constants/methods';
import { ContentType, Message, Requests } from 'enums';
import { setResponse } from 'utils/setResponse';

const PORT = process.env.PORT || 4000;
const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url?.startsWith(Requests.users)) {
    if (req.method) {
      return methods[req.method as keyof Methods](req, res);
    }
  }

  setResponse(res, Message.invalidEndpoint, 404, ContentType.text);
});

server.on('error', (error) => {
  console.error(error);
});

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
