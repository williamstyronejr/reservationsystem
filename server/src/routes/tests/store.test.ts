import path from 'path';
import request from 'supertest';
import startServer from '../../server';
import { createRandomString } from '../../utils/utils';
import { createReview, createStore, getTokenCookie, signupUser } from './utils';

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
const testfileLoc = path.join(__dirname, 'profileTest.jpeg');

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
});

afterAll(async () => {
  await server.closeAsync();
});

beforeEach(async () => {
  // jest.resetAllMocks();
});

describe('GET /store/:storeId', () => {
  const routeToTest = (id: string) => `/store/${id}`;

  test('Non existing and invalid id should throw 404 error', async () => {
    // Invalid id type
    await request(server)
      .get(routeToTest('Invalid'))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(404);

    // Non existing
    await request(server)
      .get(routeToTest('0'))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(404);
  });

  test('Valid request should response 200 with store data', async () => {
    const res = await request(server)
      .get(routeToTest(storeId))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(200);

    expect(res.body.id).toBeDefined();
  });
});

describe('GET /dashboard/store/:storeId', () => {
  const routeToTest = (id: string) => `/dashboard/store/${id}`;

  test('Non auth request should throw 401 error', async () => {
    await request(server)
      .get(routeToTest('1'))
      .set('Cookie', cookieNonAuth)
      .set('csrf-token', csrfTokenNonAuth)
      .expect(401);
  });

  test('Non existing and invalid id should throw 404 error', async () => {
    // Non existing
    await request(server)
      .get(routeToTest('0'))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(404);

    // Invalid id type
    await request(server)
      .get(routeToTest('Invalid'))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(404);
  });

  test('User without permissions should throw 403 error', async () => {
    await request(server)
      .get(routeToTest(storeId))
      .set('Cookie', cookie2)
      .set('csrf-token', csrfToken2)
      .expect(403);
  });

  test('Valid request should response 200 with store data', async () => {
    const res = await request(server)
      .get(routeToTest(storeId))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(200);

    expect(res.body.id).toBeDefined();
  });
});

describe('POST /store/create', () => {
  const name = 'testing';
  const location = '123 street';
  const phone = '555';
  const tags = 'testing';
  const routeToTest = () => '/store/create';

  test('Non auth request should throw 401 error', async () => {
    await request(server)
      .post(routeToTest())
      .set('Cookie', cookieNonAuth)
      .set('csrf-token', csrfTokenNonAuth)
      .expect(401);
  });

  test('Invalid parameters should throw 400 error with error messages', async () => {
    const res = await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(400);

    expect(res.body.errors.name).toBeDefined();
  });

  test('Valid request should response 200 with storeId', async () => {
    await request(server)
      .post(routeToTest())
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({
        name,
        location,
        phone,
        tags,
      })
      .expect(200);
  });
});

describe('POST /store/:storeId/update', () => {
  const routeToTest = (id: string) => `/store/${id}/update`;
  const name = 'testing';
  const location = '123 street';
  const phone = '555';
  const tags = 'testing';
  let tempStoreId: string;

  beforeAll(async () => {
    const body = await createStore(request, server, csrfToken, cookie, {
      name,
      location,
      phone,
      tags,
    });
    tempStoreId = body.storeId;
  });

  test('Non auth request should throw 401 error', async () => {
    await request(server)
      .post(routeToTest(tempStoreId))
      .set('Cookie', cookieNonAuth)
      .set('csrf-token', csrfTokenNonAuth)
      .expect(401);
  });

  test('Invalid or non existing storeId will throw 404 error', async () => {
    // Invalid id type
    await request(server)
      .post(routeToTest('invalid'))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(404);

    // Non existing id
    await request(server)
      .post(routeToTest('0'))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(404);
  });

  test('Request from user without permissions should throw 403 error', async () => {
    const newName = 'test';

    await request(server)
      .post(routeToTest(tempStoreId))
      .set('Cookie', cookie2)
      .set('csrf-token', csrfToken2)
      .send({ name: newName })
      .expect(403);
  });

  test('Valid request should response 200 with updated store', async () => {
    const newName = 'test';

    const res = await request(server)
      .post(routeToTest(tempStoreId))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({ name: newName })
      .expect(200);

    expect(res.body.store.name).toBe(newName);
  });
});

describe('POST /store/:storeId/update/image', () => {
  const routeToTest = (id: number | string) => `/store/${id}/update/image`;

  test('Non auth request should throw 401 error', async () => {
    await request(server)
      .post(routeToTest(storeId))
      .set('Cookie', cookieNonAuth)
      .set('csrf-token', csrfTokenNonAuth)
      .expect(401);
  });

  test('Request without params should response 200 with failed success', async () => {
    const res = await request(server)
      .post(routeToTest(0))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(200);

    expect(res.body.success).toBeFalsy();
  });

  test('Non existing store should throw 404 error', async () => {
    await request(server)
      .post(routeToTest(0))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .field('removeHeader', false)
      .expect(404);
  });

  test('Request made by user without permission should throw 403 error', async () => {
    await request(server)
      .post(routeToTest(storeId))
      .set('Cookie', cookie2)
      .set('csrf-token', csrfToken2)
      .field('removeHeader', false)
      .expect(403);
  });

  test('Attempting to remove defaults will response 200 with failed success', async () => {
    const resHeader = await request(server)
      .post(routeToTest(storeId))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .field('removeHeader', true)
      .expect(200);

    const resIcon = await request(server)
      .post(routeToTest(storeId))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .field('removeIcon', true)
      .expect(200);

    expect(resHeader.body.succees).toBeFalsy();
    expect(resIcon.body.succees).toBeFalsy();
  });

  test('Uploading images should response 200 with changed parameters', async () => {
    const res = await request(server)
      .post(routeToTest(storeId))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .attach('icon', testfileLoc)
      .attach('headerImage', testfileLoc)
      .expect(200);

    expect(res.body.success).toBeTruthy();
    expect(res.body.fields.headerImage).toBeDefined();
    expect(res.body.fields.icon).toBeDefined();
  });

  test('Removing an uploaded file should response 200 with changed parameters', async () => {
    await request(server)
      .post(routeToTest(storeId))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .attach('icon', testfileLoc)
      .expect(200);

    const res = await request(server)
      .post(routeToTest(storeId))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .field('removeIcon', true)
      .expect(200);

    expect(res.body.success).toBeTruthy();
    expect(res.body.fields.icon).toBeDefined();
  });
});

describe('POST /store/:storeId/review/create', () => {
  const routeToTest = (id: string) => `/store/${id}/review/create`;
  const rating = 4;
  const message = 'Review message test';

  test('Non auth request should throw 401 error', async () => {
    await request(server)
      .post(routeToTest('123'))
      .set('Cookie', cookieNonAuth)
      .set('csrf-token', csrfTokenNonAuth)
      .expect(401);
  });

  test('Non existing and invalid stores should throw 404 error', async () => {
    // Test invalid key type
    await request(server)
      .post(routeToTest('invalidId'))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({ rating, message })
      .expect(404);

    // Non existing Id
    await request(server)
      .post(routeToTest('-0'))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({ rating, message })
      .expect(404);
  });

  test('Reviewing private store should throw 404 error', async () => {
    // Create private store
    const res = await createStore(request, server, csrfToken, cookie, {
      name: 'Name',
      location: 'location',
      phone: '5555555555',
      tags: 'tag',
      isPublic: false,
    });

    await request(server)
      .post(routeToTest(res.storeId))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({ rating, message })
      .expect(404);
  });

  test('Valid request should response 200 with review object', async () => {
    const res = await request(server)
      .post(routeToTest(storeId))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .send({ rating, message })
      .expect(200);

    expect(res.body.review).toBeDefined();
  });
});

describe('POST /review/:reviewId/delete', () => {
  const routeToTest = (reviewId: string) => `/review/${reviewId}/delete`;
  let reviewId: string;

  // Create a review
  beforeAll(async () => {
    const rating = '4';
    const message = 'Test';

    const review = await createReview(
      request,
      server,
      csrfToken,
      cookie,
      storeId,
      { rating, message },
    );

    reviewId = review.id;
  });

  test('Non auth request should throw 401 error', async () => {
    await request(server)
      .post(routeToTest('1'))
      .set('Cookie', cookieNonAuth)
      .set('csrf-token', csrfTokenNonAuth)
      .expect(401);
  });

  test('Non existing review should throw 404 error', async () => {
    // Non existing
    await request(server)
      .post(routeToTest('0'))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(404);

    // Invalid id type
    await request(server)
      .post(routeToTest('invalidId'))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(404);
  });

  test('Non matching user attempting deletion should throw 403 error', async () => {
    await request(server)
      .post(routeToTest(reviewId))
      .set('Cookie', cookie2)
      .set('csrf-token', csrfToken2)
      .expect(403);
  });

  test('Valid request should return 200 with success message', async () => {
    await request(server)
      .post(routeToTest(reviewId))
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)
      .expect(200);
  });
});
