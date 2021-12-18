import db from '../models/index';

/**
 * Creates a new user using provided parameters.
 * @param username User's Username
 * @param email User's email
 * @param hash User's hash
 * @returns Returns a promise to resolve with a user object if created.
 */
export function createUser(username: string, email: string, hash: string) {
  return db.models.User.create({ username, email, hash });
}

/**
 * Finds and returns a user by their id.
 * @param id Id of user
 * @return Returns a user object if found, otherwise returns null.
 */
export function findUserById(
  id: number | string,
): Promise<Record<string, unknown> | null> {
  return db.models.User.findByPk(id);
}
