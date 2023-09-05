describe('RBLTNG-813_RBLTNG-481_RBLTNG-847', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  var TrainStelleCount

  var Stelle1 = new Array();

  var Stelle2 = new Array();

  var rowsLength

  var controlPointLocation;

  var controlPointLocation1;

  var TrainCount = 0

  var RandomTrainPick = 0

  
  /*

  Operating points have an N:M (this does not mean an SQL relation, but a technical) reference to the control center
  Control centers have an N:1 (this does not mean an SQL relation, but a technical) reference to the region

  Only those train journeys that are the responsibility of the user's control center are displayed (defined in the regionalization concept;

AK_1 In the train detail page there is a "back button" similar to the mockups in the design master file

AK_2 Clicking on the button opens the train overview with the table that shows all relevant train journeys.

AK_3 Changes to the attributes or properties of the train journeys will continue to be updated in the table.

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
  cy.task('readXlsx', { file: 'cypress/fixtures/220517.xlsx', sheet: "Betriebstelle_Leitstelle" }).then((rows) => {
    rowsLength = rows.length;
    cy.writeFile("cypress/fixtures/xlsxData.json", { rows })
  })
 
  cy.fixture('xlsxData').then((data) => {
    for (let i = 0; i < rowsLength; i++) {
      if (data.rows[i].LSt == controlPointLocation1) {
      //      cy.log(data.rows[i].Ril100)
            Stelle1.push(data.rows[i].Ril100);
          }  
          }
        })
  
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

             for (let i = 0; i < TrainStelleCount; i++) {

                   Stelle2.push(response.body.data.trainDetail.runway.customerStops[i].stop.ril100);
                }

          const intersection = Stelle1.filter(element => Stelle2.includes(element));

          if (intersection.length == 0)
               {
                  throw new Error("check your stations")
   
               }
           })

 
  })

  cy.contains('Zurück zur vorherigen Seite').click()

  cy.intercept({
    method: 'POST',
    path: '/api/v1'
  }).as('apiCheck4')

  cy.reload()

  cy.wait(10000)

  cy.wait('@apiCheck4') // discard

  cy.wait('@apiCheck4').then(({response}) => {

  expect(response.statusCode).to.eq(200);

  cy.contains('RBL TNG').should('exist')

  cy.contains('Zugübersicht').should('exist')

  TrainCount = (response.body.data.trainOverview.length);

  RandomTrainPick = Math.floor(Math.random() * TrainCount)
         
      //   cy.log(RandomTrainPick)

         cy.intercept({
            method: 'POST',
            path: '/api/v1'
          }).as('apiCheck5')

          // cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-sizeMedium.css-ts71t2').eq(RandomTrainPick).click()
          
          cy.get("[data-cy='SvgArrowRight']").eq(RandomTrainPick).click()   

          cy.wait('@apiCheck5').then(({response}) => {

            expect(response.statusCode).to.eq(200);

            cy.contains('Kundenfahrplan').should('exist')

            cy.contains('Betriebsfahrplan').should('exist')

          TrainStelleCount = (response.body.data.trainDetail.runway.customerStops.length)

           for (let i = 0; i < TrainStelleCount; i++) {

                 Stelle2.push(response.body.data.trainDetail.runway.customerStops[i].stop.ril100);
              }

        const intersection = Stelle1.filter(element => Stelle2.includes(element));

        if (intersection.length == 0)
             {
                throw new Error("check your stations")
 
             }
         })

})





  

  cy.get("[data-cy='SvgArrowDown']").eq(0).click()

  cy.contains('Abmelden').click()

  cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  })

  
  

})