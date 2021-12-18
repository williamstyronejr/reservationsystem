type ValidatorParams = {
  username?: string;
  password?: string;
  email?: string;
  confirmPassword: string;
};

/**
 * Validation for authentication fields, but does not require the fields to
 *  exists.
 * @param param Object containing values to be validated
 * @returns Returns a object with validation errors if any exists, or null if no
 *  errors present.
 */
export function validateAuth({
  username,
  password,
  email,
  confirmPassword,
}: ValidatorParams): Record<string, string> | null {
  const errors: Record<string, string> = {};

  if (username !== undefined) {
    if (username.trim().length < 4 || username.trim().length >= 33)
      errors.username = 'Username must between 4 and 32 characters.';
  }

  if (email !== undefined) {
    // Simples validation
    if (!email.includes('@') || !email.includes('.'))
      errors.email = 'Provided Email is not valid.';
  }

  if (password !== undefined) {
    if (password.trim().length < 4)
      errors.password = 'Passord must be at least 4 characters.';
  }

  if (confirmPassword !== undefined) {
    if (confirmPassword !== password)
      errors.confirmPassword = 'Confirm password does not match password.';
  }

  return Object.keys(errors).length !== 0 ? errors : null;
}
