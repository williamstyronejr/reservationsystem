import db from '../models/index';
import { hashString } from '../utils/utils';

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

/**
 * Updates the user's hash with a hash from the new password.
 * @param id Id of user
 * @param newPassword New password to set
 * @returns Returns a promise to resolve with a user object.
 */
export function updateUserPassword(id: number | string, newPassword: string) {
  return hashString(newPassword).then((hash) => {
    db.models.User.update({ hash }, { where: { id } });
  });
}

/**
 * Updates an user by their id.
 * @param id Id of user
 * @param params Parameters to update.
 * @returns Returns a promise to resolve with array containing the number of
 *  fields updated and the user object.
 */
export function updateUserById(
  id: number | string,
  params: Record<string, string | number>,
): Promise<[Number, Record<string, unknown>?]> {
  return db.models.User.update(params, { where: { id }, returning: true });
}
