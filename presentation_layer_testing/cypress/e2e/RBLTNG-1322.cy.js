describe('RBLTNG-1322', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

 
  var rowsLength

  var controlPointLocation;

  var controlPointLocation1;

  var TrainCount = 0

  var RandomTrainPick = 0

  var TrainStelleCount

  
  /*

  Operating points have an N:M (this does not mean an SQL relation, but a technical) reference to the control center
  Control centers have an N:1 (this does not mean an SQL relation, but a technical) reference to the region

  Only those train journeys that are the responsibility of the user's control center are displayed (defined in the regionalization concept;

*/


  it('AK', () => {


  cy.visit(`${Cypress.config().baseUrl}/?`);

  cy.intercept({
    method: 'POST',
    path: '/api/v1'
  }).as('apiCheck1')
  
 cy.get('.websso-btn').click()

 cy.wait('@apiCheck1').then(({response}) => {

 expect(response.statusCode).to.eq(200);

 controlPointLocation1 = response.body.data.login.controlPointLocation

  controlPointLocation = JSON.stringify(response.body.data.login.controlPointLocation)

  if (controlPointLocation == '')

  {
    throw new Error("No Leitstelle assigned to the user. Please check.")
  }

  else
  {
    cy.log('The Leitstelle which the user assigned is '+ controlPointLocation)
  }
  
})

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck2')

    cy.reload()

    cy.wait(10000)

    cy.wait('@apiCheck2') // discard

    cy.wait('@apiCheck2').then(({response}) => {

    expect(response.statusCode).to.eq(200);

    cy.contains('RBL TNG').should('exist')

    cy.contains('Zugübersicht').should('exist')

    TrainCount = (response.body.data.trainOverview.length);

    RandomTrainPick = Math.floor(Math.random() * TrainCount)
           
        //   cy.log(RandomTrainPick)

           cy.intercept({
              method: 'POST',
              path: '/api/v1'
            }).as('apiCheck3')

            // cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-sizeMedium.css-ts71t2').eq(RandomTrainPick).click()
            
            cy.get("[data-cy='SvgArrowRight']").eq(RandomTrainPick).click()   

            cy.wait('@apiCheck3').then(({response}) => {

              expect(response.statusCode).to.eq(200);

              cy.contains('Kundenfahrplan').should('exist')

              cy.contains('Betriebsfahrplan').should('exist')

            TrainStelleCount = (response.body.data.trainDetail.runway.customerStops.length)


          if (TrainStelleCount == 0)
               {
                  throw new Error("check your Train Details")
   
               }
           })

 
  })
 

  cy.get("[data-cy='SvgArrowDown']").eq(0).click()

  cy.contains('Abmelden').click()

  cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  })

  
  

})