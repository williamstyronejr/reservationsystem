import db from '../models/index';

export async function createResevation(
  madeBy: string,
  startDate: Date,
  endDate: Date,
  confirmation = false,
) {
  return db.models.Reservation.create({
    madeBy,
    startDate,
    endDate,
    confirmation,
  });
}

export async function updateResevation() {
  return db.models.Reservation.update();
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
