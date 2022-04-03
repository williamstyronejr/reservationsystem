import { Request, Response, NextFunction } from 'express';
import mime from 'mime';
import { pseudoRandomBytes } from 'crypto';
import { uploadFirebaseFile } from '../services/firebase';

/**
 * Creates a new file name for a file using a random string, appended by
 *  current date and the ext.
 * @param file File to create new name for
 * @returns {String} Returns a promise to resolve with a new filename with ext.
 */
async function createFileName(file: any): Promise<string> {
  return new Promise((res, rej) => {
    pseudoRandomBytes(8, (err, buf) => {
      const ext = mime.extension(file.mimetype);
      if (err) return res(`${file.filename}-${Date.now()}.${ext}`);

      return res(`${buf.toString('hex')}-${Date.now()}.${ext}`);
    });
  });
}

/**
 * Middleware for uploading a file(s). File information is set to
 *  res.locals.fileLoc as an array.
 * @param req Request object
 * @param res Response object
 * @param next Next function to be called
 * @returns Returns a to promise to resolve when flie is uploaded.
 */
export async function uploadFile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.file && (!req.files || Object.keys(req.files).length === 0))
    return next();

  try {
    if (req.files && Object.keys(req.files).length > 0) {
      const proms: Array<Promise<any>> = [];

      Object.values(req.files).forEach((file: any) => {
        proms.push(
          createFileName(file[0]).then((fileName) =>
            uploadFirebaseFile(file[0], fileName),
          ),
        );
      });

      const fileLocs = await Promise.all(proms);
      res.locals.fileLoc = fileLocs;

      return next();
    }

    const fileName = await createFileName(req.file);
    const results = await uploadFirebaseFile(req.file, fileName);

    res.locals.fileLoc = [results];

    next();
  } catch (err) {
    next(err);
  }
}
