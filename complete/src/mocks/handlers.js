/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const response = (body) => (req, res, ctx) => res(ctx.json(body));

export const handlers = [
  rest.post('https://testurl.com', response({ id: 'testid'})),
];
