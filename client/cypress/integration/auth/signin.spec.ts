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

describe('Signin page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Signin').click();
  });

  it('Empty fields should show error message', () => {
    cy.get('form').submit();
    cy.get('[data-cy="error"]');
  });

  it('Incorrect value pair should show error message', () => {
    const invalidUsername = createRandomString(8);

    cy.get('[name="username"]').type(invalidUsername);
    cy.get('[name="password"]').type(password);
    cy.get('form').submit();
    cy.get('[data-cy="error"]');
  });

  it('Correct value pair should redirect user to dashboard', () => {
    cy.get('[name="username"]').type(username);
    cy.get('[name="password"]').type(password);
    cy.get('form').submit();
    cy.location('pathname').should('eq', '/dashboard');
  });
});
