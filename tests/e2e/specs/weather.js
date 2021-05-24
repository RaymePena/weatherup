/// <reference types="Cypress" />
describe('Test the open weather api', () => {
    beforeEach(() => {
        cy.request('http://api.openweathermap.org/data/2.5/weather?lat=40.7608&lon=-111.876183&units=imperial&appid=6d78fcf2b6ddf4f00ae680a37639b3d6').as('weather')
    })

    it('should return status code 200', () => {
        cy.get('@weather')
        .its('status')
        .should('be.equal', 200)
    })
    
    it('should return the correct name', () => {
        cy.get('@weather')
        .its('body.name')
        .should('be.equal', 'Salt Lake City')
    })

    it('should return the correct wind property[speed]', () => {
        cy.get('@weather')
        .its('body.wind')
        .should('have.property', 'speed')
    })

    it('should return the correct wind property [deg]', () => {
        cy.get('@weather')
        .its('body.wind')
        .should('have.property', 'deg')
    })

    it('should return the correct main property [temp]', () => {
        cy.get('@weather')
        .its('body.main')
        .should('have.property', 'temp')
    })

    it('should return the correct main property [humidity]', () => {
        cy.get('@weather')
        .its('body.main')
        .should('have.property', 'humidity')
    })


})