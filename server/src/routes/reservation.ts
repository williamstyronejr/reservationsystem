import { Router, Response, Request, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { requireLocalSignin } from '../middlewares/auth';
import {
  getReservationById,
  createReservation,
  updateReservation,
} from '../services/reservation';
import { validateReservationCreation } from '../middlewares/validation';
import { reserveSeats } from '../services/item';

const router = Router();
const jsonParser = bodyParser.json({});

router.get(
  '/reservation/:rId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { rId } = req.params;

    try {
      const reservation = await getReservationById(rId);

      if (!reservation) {
        const missingError: any = new Error(
          `Reservation, ${rId}, does not exist.`,
        );
        missingError.status = 404;
        return next(missingError);
      }

      res.json({ ...reservation.dataValues });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/reservation/create',
  jsonParser,
  requireLocalSignin,
  validateReservationCreation,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as any;
    const { storeId, startDate, endDate, seats } = req.body;

    try {
      if (!Array.isArray(seats) || seats.length === 0) {
        const paramError: any = new Error(
          'Seats must be selected to create reservation.',
        );
        paramError.status = 400;
        paramError.msg = {
          seats: 'A seat must be selected to create reservation.',
        };
        return next(paramError);
      }

      const reservation = await createReservation(
        id,
        storeId,
        startDate,
        endDate,
      );

      const reservedSeats = await reserveSeats(reservation.id, storeId, seats);

      return res.json(reservation.dataValues);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/reservation/:rId/update',
  jsonParser,
  requireLocalSignin,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as any;
    const { rId } = req.params;

    try {
      const data = await updateReservation(id, rId, {});

      if (data[0] === 0) {
        const missingError: any = new Error(
          `Reservation, ${rId}, could not be updated.`,
        );
        missingError.status = 403;
        return next(missingError);
      }

      return res.json();
    } catch (err) {
      return next(err);
    }
  },
);

export default router;
