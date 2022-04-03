import db from '../models/index';
import { defaultUrls } from './firebase';

export function createStore(
  manager: string,
  name: string,
  location: string,
  tags: string,
  phone: string,
  isPublic = false,
  headerImage = defaultUrls.storeHeader,
  icon = defaultUrls.storeIcon,
): Promise<any> {
  return db.models.Store.create({
    manager,
    name,
    location,
    public: isPublic,
    headerImage,
    icon,
    phone,
    tags,
  });
}

/**
 * Deletes a store from the database.
 * @param storeId Id of a store
 * @param ownerId User id of the owner
 * @returns {Promise<Number>} Returns a promise to resolve with the number of
 *  rows deleted.
 */
export function deleteStore(storeId: string, ownerId: string): any {
  return db.models.Store.destory({ where: { id: storeId, manager: ownerId } });
}

/**
 * Updates a store with data only if the user is manager of the store.
 * @param id Id of the store
 * @param manager User id of the manager
 * @param values Object containing fields/values to update
 * @returns {Promise<Array<any>>} Returns a promise to resolve with an array
 *  containing the number of rows changed and the updated store object.
 */
export function updateStore(
  id: string,
  manager: string,
  values: {
    name?: string;
    location?: string;
    tags?: string;
    phone?: string;
    public?: boolean;
    icon?: string;
    headerImage?: string;
  },
) {
  return db.models.Store.update(values, {
    where: { manager, id },
    returning: true,
  });
}

/**
 * Finds a store by it id.
 * @param {String} storeId Id of store
 * @returns {Promise<Object>} Returns a promise to resolve with a store object
 *  if found, otherwise null.
 */
export function getStoreById(storeId: string) {
  return db.models.Store.findByPk(storeId);
}

export function getStoreWithComments(storeId: string): any {
  return db.models.Store.findByPk(storeId, {
    include: [
      {
        model: db.models.Review,
      },
    ],
  });
}
