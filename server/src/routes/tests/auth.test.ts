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
  test('Empty parameter should throw 400 error with error message', async () => {
    const res = await request(server).post('/signup').expect(400);

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
      .post('/signup')
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
      .post('/signup')
      .send({ username, password, email, confirm })
      .expect(200);
  });
});
