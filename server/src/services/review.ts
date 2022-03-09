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

export async function updateReview() {
  //
}
