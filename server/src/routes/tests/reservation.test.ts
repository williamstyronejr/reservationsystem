import path from 'path';
import request from 'supertest';
import startServer from '../../server';
import { createRandomString } from '../../utils/utils';
import {
  createReservation,
  createStore,
  createStoreItems,
  getTokenCookie,
  signupUser,
} from './utils';

// Prevent changes to firebase
// jest.mock('../../services/firebase')

const username = createRandomString(8);
const email = createRandomString(8, '@email.com');
const username2 = createRandomString(8);
const email2 = createRandomString(8, '@email.com');
const password = 'test';
let storeId: string;
let server: any;
let cookie: string;
let csrfToken: string;
let cookie2: string;
let csrfToken2: string;
let cookieNonAuth: string;
let csrfTokenNonAuth: string;

const { IP, PORT } = process.env;

beforeAll(async () => {
  const name = 'Store name 1';
  const location = 'Address';
  const phone = '5555555555';
  const tags = 'pizza';
  server = await startServer(IP as string, parseInt(PORT as string, 10));

  [
    [csrfToken, cookie],
    [csrfToken2, cookie2],
    [csrfTokenNonAuth, cookieNonAuth],
  ] = await Promise.all([
    getTokenCookie(request, server),
    getTokenCookie(request, server),
    getTokenCookie(request, server),
  ]);

  // Signup users
  await Promise.all([
    signupUser(request, server, csrfToken, cookie, {
      email,
      username,
      password,
      confirmPassword: password,
    }),
    signupUser(request, server, csrfToken2, cookie2, {
      email: email2,
      username: username2,
      password,
      confirmPassword: password,
    }),
  ]);

  const body = await createStore(request, server, csrfToken, cookie, {
    name,
    location,
    phone,
    tags,
    isPublic: true,
  });

  storeId = body.storeId;

  await createReservation(request, server, csrfToken, cookie, {
    storeId,
    startDate: new Date(),
    endDate: new Date(),
  });

  // Create seats in the store
  await createStoreItems(request, server, csrfToken, cookie, storeId, [
    { type: 1, length: 1, level: 1 },
  ]);
});

afterAll(async () => {
  await server.closeAsync();
});

describe('/GET /reservation/:rId', () => {
  const routeToTest = (rId: string | number) => `/reservation/${rId}`;

  test('No existing reservation should throw 404 error', async () => {
    await request(server)
      .get(routeToTest(0))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(404);
  });

  test('Existing reservation should response 200 with data', async () => {
    const id = 1;

    const res = await request(server)
      .get(routeToTest(id))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(200);

    expect(res.body.id).toBe(id);
  });
});

describe('/POST /reservation/create', () => {
  const routeToTest = () => '/reservation/create';

  test('Non-auth request should throw 401 error', async () => {
    await request(server)
      .post(routeToTest())
      .set('Cookie', cookieNonAuth)
      .set('csrf-token', csrfTokenNonAuth)
      .expect(401);
  });

  test('No seats provided should throw 400 error with message', async () => {
    const startDate = new Date();
    const endDate = new Date();
    const seats: Array<string> = [];

    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({
        storeId,
        startDate,
        endDate,
        seats,
      })
      .expect(200);

    expect(res.body.id).toBeDefined();
    expect(res.body.storeId).toBe(storeId);
  });
  test('Valid request should response 200 with reservation data', async () => {
    const startDate = new Date();
    const endDate = new Date();
    const seats: any = ['1'];

    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({
        storeId,
        startDate,
        endDate,
        seats,
      })
      .expect(200);

    expect(res.body.id).toBeDefined();
    expect(res.body.storeId).toBe(storeId);
  });
});

describe('/POST /reservation/:rId/update', () => {
  const routeToTest = (rId: string | number) => `/reservation/${rId}/update`;

  test('Non-auth request should throw 401 error', async () => {
    await request(server)
      .post(routeToTest(0))
      .set('Cookie', cookieNonAuth)
      .set('csrf-token', csrfTokenNonAuth)
      .expect(401);
  });
});
