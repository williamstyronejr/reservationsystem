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
