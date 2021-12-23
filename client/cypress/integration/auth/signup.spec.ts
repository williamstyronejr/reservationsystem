import { createRandomString } from '../../utils';

const username = createRandomString(8);
const password = 'test';
const email = createRandomString(8, '@email.com');
const confirmPassword = 'test';

before(() => {
  cy.register(email, username, password, confirmPassword);
});

afterEach(() => {
  Cypress.Cookies.preserveOnce('session');
});

describe('Sign up', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Signup').click();
  });

  it('Empty fields should show error message', () => {
    cy.get('form').submit();
    cy.get('[data-cy="input-error"]');
  });

  it('Invalid fields should show field errors', () => {
    const invalidUsername = createRandomString(3);
    const invalidEmail = 'test';
    const invalidPassword = 't';
    cy.get('[name="email"').type(invalidEmail);
    cy.get('[name="username"').type(invalidUsername);
    cy.get('[name="password"').type(invalidPassword);
    cy.get('[name="confirmPassword"').type(`${invalidPassword}1`);
    cy.get('form').submit();

    cy.get('[data-cy="input-error"]');
  });

  it('Username and email already used should show field error', () => {
    cy.get('[name="email"').type(email);
    cy.get('[name="username"').type(username);
    cy.get('[name="password"').type(password);
    cy.get('[name="confirmPassword"').type(password);
    cy.get('form').submit();

    cy.get('[data-cy="input-error"]');
  });

  it('Valid fields should redirect user to dashboard page', () => {
    const newUsername = createRandomString(8);
    const newEmail = createRandomString(9, '@email.com');

    cy.get('[name="email"').type(newEmail);
    cy.get('[name="username"').type(newUsername);
    cy.get('[name="password"').type(password);
    cy.get('[name="confirmPassword"').type(password);
    cy.get('form').submit();

    cy.location('pathname').should('eq', '/dashboard');
  });
});
