describe('RBLTNG-1233_RBLTNG-1243', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  var controlPointLocation;
  var SessionexpirationTimestamp;
  var refreshExpirationTimestamp;
 
  var FirstName
  var LastName

  // The trains and their runnuing status

/*

AK 1: After successful authentication, the system must determine the user's authorizations.

AK 2: If it is not possible to determine the authorization, the system must abort the registration process and must not allow access to the system.

AK 3: After successful authentication, the system must determine the assignment of the user to a control center.

AK 4: If it is not possible to determine the assignment of the user to a control center, then the system must abort the registration process and must not allow access to the system.



AK 2: After successfully logging out, the user is redirected to the RBL TNG login page (similar to the automatic logout RBLTNG-1242)

AK 3: The login mask contains an inline notification that informs the user that he has successfully logged out

*/
  
  it('AK1_AK2_AK3_AK4___AK2_AK3', () => {


    // Application URL should be accessible

    cy.visit(`${Cypress.config().baseUrl}/?`);

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck1')

     
   cy.get('.websso-btn').click()

   cy.wait('@apiCheck1').then(({response}) => {

   expect(response.statusCode).to.eq(200);



   FirstName = response.body.data.login.firstname

   LastName = response.body.data.login.lastname

    if (FirstName == '' || LastName == '')

    {
      throw new Error("No User assigned")
    }

    else
    {
      cy.log('User assigned is ' + FirstName + ' ' + LastName)
    }

    // cy.log(JSON.stringify(response.body.data.login.expirationTimestamp))
    
    SessionexpirationTimestamp= response.body.data.login.expirationTimestamp
    const c = new Date(SessionexpirationTimestamp)
   cy.log('Session expiration Timestamp is ' + c.toISOString())

    refreshExpirationTimestamp = response.body.data.login.refreshExpirationTimestamp
    const d = new Date(refreshExpirationTimestamp)
    cy.log('Refresh Expiration Timestamp is' + d.toISOString())

    // const e = new Date(Date.now())
    // cy.log(e.toISOString())

    controlPointLocation = JSON.stringify(response.body.data.login.controlPointLocation)

    if (controlPointLocation == '')

    {
      throw new Error("No Leitstelle assigned to the user. Please check.")
    }

    else
    {
      cy.log('The Leitstelle which the user assigned is'+ controlPointLocation)
    }

  })

    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  
  })


})