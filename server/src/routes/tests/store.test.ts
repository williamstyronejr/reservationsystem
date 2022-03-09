import request from 'supertest';
import startServer from '../../server';
import { createRandomString } from '../../utils/utils';
import { createStore, getTokenCookie, signupUser } from './utils';

const username = createRandomString(8);
const email = createRandomString(8, '@email.com');
const password = 'test';
let server: any;
let cookie: string;
let csrfToken: string;

const { IP, PORT } = process.env;

beforeAll(async () => {
  const name = 'Store name 1';
  const location = 'Address';
  const phone = '5555555555';
  const tags = 'pizza';
  server = await startServer(IP as string, parseInt(PORT as string, 10));
  [csrfToken, cookie] = await getTokenCookie(request, server);

  // Signup users
  await signupUser(request, server, csrfToken, cookie, {
    username,
    password,
    confirmPassword: password,
    email,
  });

  await createStore(request, server, csrfToken, cookie, {
    name,
    location,
    phone,
    tags,
  });
});

describe('Reviewing a store', async () => {});
