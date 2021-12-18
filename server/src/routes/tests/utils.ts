/**
 * Sends a request to server to get a session cookie and csrf token.
 * @param request Supertest request object
 * @param server Http server to run test on
 * @returns Returns an array containing csrfToken and cookie.
 */
export default async function getSession(
  request: any,
  server: any,
): Promise<Array<string>> {
  const res = await request(server).get('/getCSRFToken').expect(200);

  return [res.body.CSRFToken, res.header['set-cookie'][0]];
}
