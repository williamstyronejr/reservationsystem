import request from 'supertest';
import startServer from '../../server';
import { createRandomString } from '../../utils/utils';
import getSession from './utils';

let server: any;
let csrfToken: string;
let cookie: string;

const { IP, PORT } = process.env;

beforeAll(async () => {
  server = await startServer(IP as string, parseInt(PORT as string, 10));
});

afterAll(async () => {
  await server.closeAsync();
});

describe('User signup', () => {
  const routeToTest = () => '/signup';

  beforeAll(async () => {
    [csrfToken, cookie] = await getSession(request, server);
  });

  test('Empty parameter should throw 400 error with error message', async () => {
    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(400);

    expect(res.body.errors.username).toBeDefined();
    expect(res.body.errors.email).toBeDefined();
    expect(res.body.errors.password).toBeDefined();
    expect(res.body.errors.confirmPassword).toBeDefined();
  });

  test('Invalid parameters should throw 400 error with error message', async () => {
    const username = 'u';
    const password = 'p';
    const email = ' email';
    const confirmPassword = 'co';

    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({ username, password, email, confirmPassword })
      .expect(400);

    expect(res.body.errors.username).toBeDefined();
    expect(res.body.errors.email).toBeDefined();
    expect(res.body.errors.password).toBeDefined();
    expect(res.body.errors.confirmPassword).toBeDefined();
  });

  test('Valid parameters should response 200 ', async () => {
    const username = createRandomString();
    const email = createRandomString(8, '@email.com');
    const password = 'password';
    const confirmPassword = 'password';

    await request(server)
      .post(routeToTest())
      .send({ username, password, email, confirmPassword })
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(200);
  });
});

describe('User signin', () => {
  const routeToTest = () => '/signin';
  const username = createRandomString();
  const email = createRandomString(8, '@email.com');
  const password = 'password';
  const confirmPassword = 'password';

  beforeAll(async () => {
    [csrfToken, cookie] = await getSession(request, server);

    // Create a user for testing
    await request(server)
      .post('/signup')
      .send({ username, password, email, confirmPassword })
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(200);
  });

  test('Empty parameter should throw 401 error', async () => {
    await request(server)
      .post(routeToTest())
      .send()
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(400);
  });

  test('Incorrect parameters should throw 401 error', async () => {
    const incorrectUsername = createRandomString();

    await request(server)
      .post(routeToTest())
      .send({ username: incorrectUsername, password })
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(401);
  });

  test('Correct signin should response 200', async () => {
    await request(server)
      .post(routeToTest())
      .send({ username, password })
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(200);
  });
});
