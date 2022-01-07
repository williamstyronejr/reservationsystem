import request from 'supertest';
import startServer from '../../server';
import { createRandomString } from '../../utils/utils';
import { signupUser, getTokenCookie } from './utils';

const username = createRandomString(8);
const email = createRandomString(8, '@email.com');
const password = 'testing';
let server: any;
let csrfToken: string;
let cookie: string;

const { IP, PORT } = process.env;

beforeAll(async () => {
  server = await startServer(IP as string, parseInt(PORT as string, 10));
  [csrfToken, cookie] = await getTokenCookie(request, server);

  await signupUser(request, server, csrfToken, cookie, {
    username,
    email,
    password,
    confirmPassword: password,
  });
});

afterAll(async () => {
  await server.closeAsync();
});

describe('POST /settings/password', () => {
  const routeToTest = () => '/settings/password';

  test('Empty parameter should throw 400 error with error message', async () => {
    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(400);

    expect(res.body.errors.oldPassword).toBeDefined();
    expect(res.body.errors.confirmPassword).toBeDefined();
  });

  test('Valid parameters should response 200 with success message', async () => {
    const newPassword = 'test';

    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({
        oldPassword: password,
        password: newPassword,
        confirmPassword: newPassword,
      })
      .expect(200);

    expect(res.body.success).toBeTruthy();
  });
});
