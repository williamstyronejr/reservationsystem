declare global {
  namespace Cypress {
    interface Chainable {
      register(
        email: string,
        username: string,
        password: string,
        confirmPassword: string,
      ): Chainable<string>;
    }
  }
}

const register = (
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
): Cypress.Chainable<string> => {
  cy.visit('/');
  cy.contains('Signup').click();

  cy.get('[name="email"]').type(email);
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('[name="confirmPassword"]').type(confirmPassword);

  cy.get('form').submit();
  return cy.location('pathname').should('eq', '/dashboard');
};

Cypress.Commands.add('register', register);

export {};
