import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

/**
 * Format creator for express validator. Errors will be in form of
 *  { [param]: msg }.
 * @param msg Error message from validation rules
 * @returns Returns the format for validation errors.
 */
const validationFormat = ({ msg }: { msg: string }) => msg;

/**
 * Express middleware that send any validation errors that occurred prevoiusly
 *  through the next function.
 * @param req Express request object
 * @param res Express response object
 * @param next Express Next function
 */
function checkValidation(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req).formatWith(validationFormat);

  if (errors.isEmpty()) return next(null);

  const err: any = new Error('Error validating user input');
  err.status = 400;
  err.msg = errors.mapped();
  return next(err);
}

const usernameValidation = () => [
  body('username', 'Invalid username')
    .exists()
    .trim()
    .isLength({ min: 4, max: 32 })
    .withMessage('Username must be 4 to 32 characters'),
];

const emailValidation = () => [
  body('email', 'Invalid email').exists().isEmail().normalizeEmail(),
];

/**
 * Validation rules for password or confirm password. If field is
 *  confirmPassword, then it will be compared to the field 'password' to check
 *  if they are equal.
 * @param fieldName Name of field in req.body for password
 * @returns Returns a express validator chain for validating password.
 */
const passwordValidation = (fieldName = 'password') => [
  body(fieldName, 'Invalid password')
    .exists()
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters')
    .custom((value, { req }) =>
      fieldName === 'confirmPassword' ? value === req.body.password : true,
    )
    .withMessage('Passwords must match.'),
];

export const validateSignup = [
  ...usernameValidation(),
  ...emailValidation(),
  ...passwordValidation(),
  ...passwordValidation('confirmPassword'),
  checkValidation,
];

export const validatePasswordUpdate = [
  ...passwordValidation(''),
  ...passwordValidation('oldPassword'),
  ...passwordValidation('confirmPassword'),
  checkValidation,
];

export const validateAccountUpdate = [
  body('username', 'Invalid username')
    .optional()
    .trim()
    .isLength({ min: 4, max: 32 })
    .withMessage('Username must be 4 to 32 characters'),
  body('email', 'Invalid email').optional().isEmail().normalizeEmail(),
  checkValidation,
];

export const validateRecovery = [...emailValidation(), checkValidation];
