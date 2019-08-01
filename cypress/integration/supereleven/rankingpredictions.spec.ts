
describe('Routing test', () => {

    it('user is redirected to login page when not logged in ', () => {
        cy.visit('https://supereleven-2019.web.app/prediction/prediction/ranking');
        cy.url().should('include', '/home');
        cy.get('[value=inloggen]').click();
        cy.get('input[placeholder="Email"]').type('werner.holzapfel@gmail.com');
        cy.get('input[placeholder="Password"]').type('werner.holzapfel@gmail.com');
        cy.get('.login-form > .ion-color').click();
    });
});
