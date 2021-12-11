import request from 'supertest';
import startServer from '../../server';
import { createRandomString } from '../../utils/utils';

let server: any;

const { IP, PORT } = process.env;

beforeAll(async () => {
  server = await startServer(IP as string, parseInt(PORT as string, 10));
});

afterAll(async () => {
  await server.closeAsync();
});

describe('User signup', () => {
  const routeToTest = () => '/signup';

  test('Empty parameter should throw 400 error with error message', async () => {
    const res = await request(server).post(routeToTest()).expect(400);

    expect(res.body.errors.username).toBeDefined();
    expect(res.body.errors.email).toBeDefined();
    expect(res.body.errors.password).toBeDefined();
    expect(res.body.errors.confirm).toBeDefined();
  });

  test('Invalid parameters should throw 400 error with error message', async () => {
    const username = 'u';
    const password = 'p';
    const email = ' email';
    const confirm = 'co';

    const res = await request(server)
      .post(routeToTest())
      .send({ username, password, email, confirm })
      .expect(400);

    expect(res.body.errors.username).toBeDefined();
    expect(res.body.errors.email).toBeDefined();
    expect(res.body.errors.password).toBeDefined();
    expect(res.body.errors.confirm).toBeDefined();
  });

  test('Valid parameters should response 200 ', async () => {
    const username = createRandomString();
    const email = createRandomString(8, '@email.com');
    const password = 'password';
    const confirm = 'password';

    await request(server)
      .post(routeToTest())
      .send({ username, password, email, confirm })
      .expect(200);
  });
});

describe('User signin', () => {
  const routeToTest = () => '/signin';
  const username = createRandomString();
  const email = createRandomString(8, '@email.com');
  const password = 'password';
  const confirm = 'password';

  beforeAll(async () => {
    // Create a user for testing
    await request(server)
      .post('/signup')
      .send({ username, password, email, confirm })
      .expect(200);
  });

  test('Empty parameter should throw 401 error', async () => {
    await request(server).post(routeToTest()).send().expect(400);
  });

  test('Incorrect parameters should throw 401 error', async () => {
    const incorrectUsername = createRandomString();

    await request(server)
      .post(routeToTest())
      .send({ username: incorrectUsername, password })
      .expect(401);
  });

  test('Correct signin should response 200', async () => {
    await request(server)
      .post(routeToTest())
      .send({ username, password })
      .expect(200);
  });
});
