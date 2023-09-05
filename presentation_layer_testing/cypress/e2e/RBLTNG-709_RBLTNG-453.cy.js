describe('RBLTNG-709', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  var TrainCount = 0



  it('AK', () => {
    

    // Application URL should be accessible

   cy.visit(`${Cypress.config().baseUrl}/?`);

  // cy.visit('https://rbl-tu1.rbl-test.comp.db.de')

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

    cy.wait('@apiCheck2')

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


        // data-cy-new
        /*
        cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-sizeMedium.css-1ogt8b9').eq(i).trigger('mouseover')
      
        cy.get('[role="tooltip"]').then(elm => {

 
        
        const InnerText = elm[0].innerText;

         if(InnerText != 'Undefined'  || 
            InnerText != 'Invalid' || 
            InnerText != 'Abzweigstelle' || 
            InnerText != 'Anschlussstelle' || 
            InnerText != 'Bahnhof' || 
            InnerText != 'Bahnhofsteil' || 
            InnerText != 'Blockstelle' || 
            InnerText != 'Deckungsstelle' || 
            InnerText != 'Grenzpunkt' || 
            InnerText != 'Haltepunkt' || 
            InnerText != 'Haltestelle' || 
            InnerText != 'Selbstblockstelle' || 
            InnerText != 'Betriebszentrale')
         
         {
           cy.log(InnerText)
         }

         else {
           throw new Error("Please check the tooltip")
         }

       })*/

  
        }
      }


      })

      cy.get("[data-cy='SvgArrowDown']").eq(0).click()

      cy.contains('Abmelden').click()
  
      cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

})
})
