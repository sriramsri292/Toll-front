// cypress/integration/basicTest.spec.js

describe('Basic Functionality', () => {
    it('Loads the app', () => {
      cy.visit('/');
      cy.get('h1').should('contain', 'Toll Calculation App');
    });
  
    it('Displays input fields and toll calculation button', () => {
      cy.visit('/');
      cy.get('#origin').should('exist');
      cy.get('#destination').should('exist');
      cy.get('#calculateTollButton').should('exist').should('be.enabled');
    });
  
    it('Validates inputs and shows appropriate errors', () => {
      cy.visit('/');
      // Test input validation and error handling
    });
  
    it('Calculates toll correctly', () => {
      cy.visit('/');
      cy.get('#origin').type('City A');
      cy.get('#destination').type('City B');
      cy.get('#calculateTollButton').click();
      cy.get('#tollAmount').should('exist').should('contain', '10.00');
    });
  });
  