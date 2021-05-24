/// <reference types="Cypress" />

describe('Test the information in the app component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
        cy.get('[data-cy="city-name"]').as('table')
    })

    it('should return city name', () => {
        cy.get('@table')
        .contains('td', 'Salt Lake City')
        .invoke('text')
        .should('equal', 'Salt Lake City')
    })

    it('should return condition', () => {
        cy.get('@table')
        .contains('td', 'Condition')
        .invoke('text')
        .should('equal', 'Condition')
    })

    it('shoult return Temperature', () => {
        cy.get('@table')
        .contains('td', 'Temperature')
        .invoke('text')
        .should('equal', 'Temperature')
    })
})