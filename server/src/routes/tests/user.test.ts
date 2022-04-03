import path from 'path';
import request from 'supertest';
import startServer from '../../server';
import { createRandomString } from '../../utils/utils';
import { signupUser, getTokenCookie } from './utils';

const username = createRandomString(8);
const username2 = createRandomString(8);
const email = createRandomString(8, '@email.com');
const email2 = createRandomString(9, '@email.com');
const password = 'testing';
let server: any;
let csrfToken: string;
let csrfToken2: string;
let cookie: string;
let cookie2: string;

const { IP, PORT } = process.env;

beforeAll(async () => {
  server = await startServer(IP as string, parseInt(PORT as string, 10));
  const [res1, res2, res3] = await Promise.all([
    await getTokenCookie(request, server),
    await getTokenCookie(request, server),
    await getTokenCookie(request, server),
  ]);
  const [csrfToken3, cookie3] = res3;
  [csrfToken, cookie] = res1;
  [csrfToken2, cookie2] = res2;

  await Promise.all([
    await signupUser(request, server, csrfToken, cookie, {
      username,
      email,
      password,
      confirmPassword: password,
    }),
    await signupUser(request, server, csrfToken3, cookie3, {
      username: username2,
      email: email2,
      password,
      confirmPassword: password,
    }),
  ]);
});

afterAll(async () => {
  await server.closeAsync();
});

describe('POST /settings/password', () => {
  const routeToTest = () => '/settings/password';

  test('Nonauth user should throw 401 error', async () => {
    await request(server)
      .post(routeToTest())
      .set('Cookie', cookie2)
      .set('csrf-token', csrfToken2)
      .send({ oldPassword: 'test', password: 'test', confirmPassword: 'test' })
      .expect(401);
  });

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

describe('/POST /settings/account', () => {
  const routeToTest = () => '/settings/account';

  test('Nonauth user should response with 401 error', async () => {
    await request(server)
      .post(routeToTest())
      .set('Cookie', cookie2)
      .set('csrf-token', csrfToken2)
      .expect(401);
  });

  test('Empty parameters should response 200 with success', async () => {
    await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(200);
  });

  test('Invalid parameters should throw 400 error with error messages', async () => {
    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({ email: 'test', username: 't' })
      .expect(400);

    expect(res.body.errors.email).toBeDefined();
    expect(res.body.errors.username).toBeDefined();
  });

  test('Used username or email should throw 400 error', async () => {
    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({ email: email2 })
      .expect(400);

    expect(res.body.errors.email).toBeDefined();
  });

  test('Valid parameters should response 200 with success', async () => {
    const newEmail = createRandomString(9, '@email.com');
    const newUsername = createRandomString(9);

    await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({ email: newEmail, username: newUsername })
      .expect(200);
  });
});

describe('POST /settings/account/profile', () => {
  const routeToTest = () => `/settings/account/profile`;

  test('Removing default image should return 200 with failed success', async () => {
    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .type('form')
      .field('remove', true)
      .expect(200);

    expect(res.body.success).toBeFalsy();
  });

  test('Valid file upload should response 200 with file url', async () => {
    const testFileLoc = path.join(__dirname, 'profileTest.jpeg');

    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .type('form')
      .attach('profile', testFileLoc)
      .expect(200);

    expect(res.body.success).toBeTruthy();
    expect(res.body.profileImage).toBeDefined();
  });

  test('Removing a uploaded image should return 200 with success', async () => {
    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .type('form')
      .field('remove', true)
      .expect(200);

    expect(res.body.success).toBeTruthy();
  });
});
