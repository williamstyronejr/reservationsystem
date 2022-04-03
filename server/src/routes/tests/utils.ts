/**
 * Sends a request to server to get a session cookie and csrf token.
 * @param request Supertest request object
 * @param server Http server to run test on
 * @returns Returns an array containing csrfToken and cookie.
 */
export async function getTokenCookie(
  request: any,
  server: any,
): Promise<Array<string>> {
  const res = await request(server).get('/getCSRFToken').expect(200);
  return [res.body.CSRFToken, res.header['set-cookie'][0]];
}

/**
 * Sends a request to server to get a session cookie and csrf token.
 * @param request Supertest request object
 * @param server Http server to run test on
 * @returns Returns an array containing csrfToken and cookie.
 */
export async function getSession(
  request: any,
  server: any,
): Promise<Array<string>> {
  const res = await request(server).get('/getCSRFToken').expect(200);

  return [res.body.CSRFToken, res.header['set-cookie'][0]];
}

/**
 * Sends a request to server to signup a user.
 * @param request Supertest request object
 * @param server Http server to run test on
 * @param csrfToken CSRF Token for request
 * @param cookie Cookie for request
 * @param params Object containing inputs for user signup
 * @returns Returns a promise to resolve with request response.
 */
export async function signupUser(
  request: any,
  server: any,
  csrfToken: string,
  cookie: string,
  params: {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
  },
): Promise<void> {
  await request(server)
    .post('/signup')
    .send(params)
    .set('Cookie', cookie)
    .set('csrf-token', csrfToken)
    .expect(200);
}

/**
 * Sends a request to create a store.
 * @param request Supertest request object
 * @param server Http server to run test on
 * @param csrfToken CSRF Token for request
 * @param cookie Cookie for request
 * @param data Object containing data for store creation.
 * @returns Returns a promise to resolve with request response.
 */
export async function createStore(
  request: any,
  server: any,
  csrfToken: string,
  cookie: string,
  data: {
    name: string;
    location: string;
    phone: string;
    tags: string;
    isPublic?: boolean;
    icon?: string;
    headerImage?: string;
  },
): Promise<any> {
  const res = await request(server)
    .post('/store/create')
    .send(data)
    .set('Cookie', cookie)
    .set('csrf-token', csrfToken)
    .expect(200);

  return res.statusCode !== 200 ? null : res.body;
}

export async function createReview(
  request: any,
  server: any,
  csrfToken: string,
  cookie: string,
  storeId: string,
  data: {
    rating: string;
    message: string;
  },
): Promise<any> {
  const res = await request(server)
    .post(`/store/${storeId}/review/create`)
    .set('csrf-token', csrfToken)
    .set('Cookie', cookie)
    .send(data)
    .expect(200);

  return res.statusCode !== 200 ? null : res.body.review;
}
