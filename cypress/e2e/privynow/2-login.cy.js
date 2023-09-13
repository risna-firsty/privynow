/// <reference types="cypress" />

describe("Test Login Page of PrivyNow", () => {
    beforeEach(() => {
      cy.viewport(1200, 800)
      cy.clearLocalStorage();
      cy.visit('https://app.privynow.com/');
    });

    afterEach (() => {
      cy.wait(2000)
      cy.screenshot()
    })
  
    it("Should be able to access login page", () => {
      cy.get('h1').should('contain', 'Log in');
      cy.get(".text-center").should('contain', 'Or, log in using');
      cy.url().should('include', 'sign-in');
    })
  
  
    it("Should not allowed to input invalid email format", () => {
      cy.get('input[data-cy="email"]').type('risrisgmail.com');
      cy.get(".sm").should('contain', 'Please enter a valid email address.');
    })
  
    it("Should enable login button after fill in both field with acceptable data", () => {
      cy.get('input[data-cy="email"]').type('risnaprod1@mailinator.com');
      cy.get('input[data-cy="password"]').type('lalala');
      cy.get('button[data-cy="submit"]').should('have.class', 'btn-primary');
    })
  
  
    it("Should not be able to log in with valid email only", () => {
      cy.get('input[data-cy="email"]').type('risnaprod1@mailinator.com');
      cy.get('button[data-cy="submit"]').should('have.class', 'btn-disabled');
    })
  
  
    it("Should not be able to log in with password only", () => {
      cy.get('input[data-cy="password"]').type('lalala');
      cy.get('button[data-cy="submit"]').should('have.class', 'btn-disabled');
    })
  
    it("Should be able to log in with valid data", () => {
      cy.get('input[data-cy="email"]').type('risnaprod1@mailinator.com');
      cy.get('input[data-cy="password"]').type('Qwert123');
      cy.get('button[data-cy="submit"]').should('have.class', 'btn-primary');
      cy.wait(500);
      cy.get('button[data-cy="submit"]').click({froce:true});
      cy.wait(10000);
      cy.get('.navbar-name').should('contain', 'Welcome');
    })
  })