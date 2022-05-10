import db from '../models/index';

/**
 * Creates a new store item.
 * @param type
 * @param level
 * @param length
 * @param storeId
 * @param creatorId
 * @returns {Promise<Object>} Returns a promise to resolve with item object.
 */
export function createStoreItem(
  type: number,
  level: number,
  length: number,
  storeId: string,
  creatorId: string,
) {
  return db.models.Item.create({
    type,
    level,
    length,
    storeId,
    creatorId,
  });
}

/**
 * Deletes a store item.
 * @param id Id of store
 * @return {Promise<Number>} Returns a promise to resolve with the number of
 *  items deleted.
 */
export function deleteStoreItem(id: string) {
  return db.models.Item.destroy({ where: { id } });
}

/**
 * Gets all the items for a store.
 * @param storeId Id of a store
 * @returns
 */
export function getAllStoreItems(storeId: string) {
  return db.models.Item.findAll({ where: { storeId } });
}

export function getAvailibleSeats(storeId: string, time: String) {
  return db.models;
}

export function reserveSeats(
  rId: string,
  storeId: string,
  seats: Array<string>,
) {
  db.models.SeatReserved.bulkCreate(
    seats.map((itemId: string) => ({
      rId,
      storeId,
      seatId: itemId,
    })),
  );
}
