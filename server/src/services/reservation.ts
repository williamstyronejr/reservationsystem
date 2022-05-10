import db from '../models/index';

export async function createReservation(
  madeBy: string,
  storeId: string,
  startDate: Date,
  endDate: Date,
  confirmation = false,
) {
  return db.models.Reservation.create({
    madeBy,
    storeId,
    startDate,
    endDate,
    confirmation,
  });
}

export async function updateReservation(
  userId: string,
  rId: string,
  params: any,
  options = { returning: true },
) {
  return db.models.Reservation.update(
    params,
    { where: { id: rId, madeBy: userId } },
    options,
  );
}

/**
 * Deletes a resevation by it's id.
 * @param id Id of reservation
 * @returns {Promise<Number>} Returns a promise to resolve with the number of
 *  rows deleted.
 */
export async function removeReservation(id: string) {
  return db.models.Reservation.destory({ where: { id } });
}

/**
 * Finds and returns a reservation by it's id.
 * @param id Id of reservation
 * @returns {Promise<Object|null>} Returns a promise to resolve with a
 *  reservation object if found, otherwise null.
 */
export function getReservationById(id: string): Promise<any> {
  return db.models.Reservation.findByPk(id);
}
