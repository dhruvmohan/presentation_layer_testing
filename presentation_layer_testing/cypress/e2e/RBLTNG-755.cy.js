describe('RBLTNG-755', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  

  var TrainCount = 0
  var RandomTrainPick = 0
  var TrainCount = 0
  var RandomTrainPick = 0

  var Line 

  var TrainNumber

  var  Category


  /* 
    
    Line (Train route), Type (Train type), Train number (Train number)  must be shown in a table
  */

  it('AK_01', () => {


    cy.visit(`${Cypress.config().baseUrl}/?`);

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck1')

    
   cy.get('.websso-btn').click()

   cy.wait('@apiCheck1').then(({response}) => {

   expect(response.statusCode).to.eq(200);

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

    if(TrainCount==0)

    {

          cy.log("No trains available")

          TrainNumber = (response.body.data.trainOverview.trainNumber)

          if(TrainNumber!=null)

          {

            throw new Error('Display empty table if no moves available , service returns response with 0 moves')
            
          }

    }

    else

    {
        
      for (let i = 0; i < TrainCount; i++) {

        Line = (response.body.data.trainOverview[i].line)

        TrainNumber = (response.body.data.trainOverview[i].trainNumber)

        Category = (response.body.data.trainOverview[i].category)

      
          if(Line==="")
          {

          throw new Error(TrainNumber + "Line number cannot be empty")
   
          }

          if(TrainNumber==="")
          {
            throw new Error(TrainNumber + "Trainnumber cannot be empty")
          }

          if(Category==="")
          {
            throw new Error(TrainNumber + "Category cannot be empty")
          }

  
        }
           RandomTrainPick = Math.floor(Math.random() * TrainCount)
           
           cy.intercept({
              method: 'POST',
              path: '/api/v1'
            }).as('apiCheck3')

            cy.get("[data-cy='SvgArrowRight']").eq(RandomTrainPick).click()
            
            cy.wait('@apiCheck3').then(({response}) => {

            expect(response.statusCode).to.eq(200);

            cy.contains('Kundenfahrplan').should('exist')

         
            cy.contains('Betriebsfahrplan').should('exist')

            cy.contains('Betriebsfahrplan').click()

        }) }
    
    })

    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  
  })




})