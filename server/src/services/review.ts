import db from '../models/index';

export async function createReview(
  rating: number,
  message: string,
  authorId: string,
  storeId: string,
) {
  return db.models.Review.create({
    rating,
    message,
    authorId,
    storeId,
  });
}

/**
 * Deletes a review by it's id. Only works if the correct user id is provided.
 * @param reviewId Id for review
 * @param owner Id of the owner for the review
 * @returns  Returns a promise to resolve with
 */
export async function deleteReview(reviewId: string, owner: string) {
  return db.models.Review.destroy({ where: { id: reviewId, authorId: owner } });
}

/**
 * Finds and returns a review by it's id.
 * @param reviewId Id of review
 * @return {Promise<any>} Returns a promise to resolve with a review object if
 *  found, otherwise null.
 */
export async function findReviewById(reviewId: string): Promise<any> {
  return db.models.Review.findByPk(reviewId);
}

export async function updateReview() {
  //
}
