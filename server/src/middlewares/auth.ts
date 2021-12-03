import passport from 'passport';

// eslint-disable-next-line import/prefer-default-export
export const requireLocalSignin = passport.authenticate('local', {});
