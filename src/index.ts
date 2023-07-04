import 'dotenv/config';
import http from 'http';
import cluster from 'node:cluster';
import os from 'node:os';
import { Methods, methods } from 'constants/methods';
import { ContentType, Message, Requests } from 'enums';
import { setResponse } from 'utils/setResponse';

const PORT = process.env.PORT || 4000;
const isMULTI = process.env.MULTI === 'true';
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

if (isMULTI) {
  if (cluster.isPrimary) {
    const len = os.cpus().length;
    for (let i = 0; i < len; i += 1) {
      const port = +PORT + i;
      const worker = cluster.fork({ PORT: port });
      worker.on('message', async (message) => {
        worker.send(message);
      });
    }
  } else if (cluster.isWorker) {
    server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
    process.on('message', (msg) => {
      console.log(msg);
    });
  }
} else {
  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}
