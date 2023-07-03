import { IncomingMessage, ServerResponse } from 'http';
import { Method } from 'enums';
import { resolveGetMethod } from 'modules/resolveGetMethod';
import { resolvePostMethod } from 'modules/resolvePostMethod';
import { resolvePutMethod } from 'modules/resolvePutMethod';
import { resolveDeleteMethod } from 'modules/resolveDeleteMethod';

export type Methods = {
  [key in Method]: (req: IncomingMessage, res: ServerResponse) => void;
}

export const methods: Methods = Object.freeze({
  'GET': (req: IncomingMessage, res: ServerResponse) => {
    resolveGetMethod(req, res);
  },
  'POST': (req: IncomingMessage, res: ServerResponse) => {
    resolvePostMethod(req, res);
  },
  'PUT': (req: IncomingMessage, res: ServerResponse) => {
    resolvePutMethod(req, res);
  },
  'DELETE': (req: IncomingMessage, res: ServerResponse) => {
    resolveDeleteMethod(req, res);
  },
});
