import db from '../models/index';

export function createTime(
  storeId: string,
  day: number,
  openTime: any,
  closeTime: any,
  creatorId: string,
) {
  return db.models.OperationTime.create({
    storeId,
    day,
    openTime,
    closeTime,
    creatorId,
  });
}

/**
 * Removes a store's time slot by it's id.
 * @param id Id of time slot
 * @param storeId Id of store
 * @return {Promise<Array<any>>} Returns a promise to resolve with a array
 *  containing number of rows removed.
 */
export function deleteTime(id: string, storeId: string) {
  return db.models.OperationTime.destory({ where: { id, storeId } });
}

/**
 * Removes all hours for a store.
 * @param storeId Id of store
 * @returns {Promise<Array<any>>} Returns a promise to resolve with number of
 *  rows removed.
 */
export function deleteStoreTimes(storeId: string) {
  return db.models.OperationTime.destroy({ where: { storeId } });
}

export function updateTime(id: string, params: Record<string, any>) {
  return db.models.OperationTime.update(params, { where: { id } });
}
