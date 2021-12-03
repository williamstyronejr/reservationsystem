import bcrpty from 'bcrypt';

const { SALT_ROUNDS } = process.env;

/**
 * Creates a hash from a string.
 * @param str String to create hash from
 * @returns Returns a promise to resolve with a hash or reject with an error.
 */
export function hashString(str: string): Promise<string> {
  return bcrpty.hash(str, parseInt(SALT_ROUNDS as string, 10) || 8);
}

/**
 * Compares a string with the hash to determine if they match.
 * @param plainText Original text
 * @param hash Hash to compare text with
 * @returns Returns a flag indicating if the text and hash match.
 */
export function compareHash(plainText: string, hash: string): Promise<boolean> {
  return bcrpty.compare(plainText, hash);
}

/**
 * Creates a pesudo random string using Math.random.
 * @param len Desired length of string
 * @param append String to append on to random string
 * @returns Returns a random string.
 */
export function createRandomString(len = 8, append = '') {
  let s = '';
  do {
    s += Math.random().toString(36).substr(2);
  } while (s.length < len);
  s = s.substr(0, len);

  return s.concat(append);
}
