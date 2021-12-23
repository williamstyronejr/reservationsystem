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

describe('Recovering account', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Signin').click();
    cy.get('[data-cy="recovery"]').click();
  });

  it('Empty field should show input error message', () => {
    cy.get('form').submit();
    cy.get('[data-cy="input-error"]');
  });

  it('Invalid email should show input error message', () => {
    cy.get('[name="email"]').type('testing');
    cy.get('form').submit();

    cy.get('[data-cy="input-error"]');
  });

  it('Valid in use email should show success message', () => {
    cy.get('[name="email"]').type(email);
    cy.get('form').submit();

    cy.get('[data-cy="notification-success"]');
  });

  it('Valid unused email should show success message', () => {
    const unusedEmail = createRandomString(8, '@email.com');
    cy.get('[name="email"]').type(unusedEmail);
    cy.get('form').submit();

    cy.get('[data-cy="notification-success"]');
  });
});
