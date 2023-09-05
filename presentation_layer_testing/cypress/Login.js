class Login {

GotoBaseURL() {
    cy.visit(`${Cypress.config().baseUrl}/?`);
}

ClickLoginButton(){
    
    cy.get('.websso-btn').click()
}

Logout(){
    
    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
}



}
export default Login