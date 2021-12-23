/**
 * Creates a random string using Math.random.
 * @param {Number} length Length of the string to be created
 * @param {String} append String to append to created string
 * @returns {String} Returns a random string.
 */
export function createRandomString(
  length: number,
  append: string = '',
): string {
  let s = '';
  do {
    s += Math.random().toString(36).substring(2);
  } while (s.length < length);
  s = s.substring(0, length);
  return s.concat(append);
}
