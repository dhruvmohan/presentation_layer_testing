describe('RBLTNG-870', () => {

  var name = ""

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
 

  it('AK', () => {

    cy.log('test')

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

        cy.intercept({
                method: 'POST',
                path: '/api/v1'
              }).as('apiCheck3')

                       
            cy.get("[data-cy='SvgArrowRight']").eq(0).click()   

            cy.wait(10000)

            cy.wait('@apiCheck3').then(({response}) => {

              expect(response.statusCode).to.eq(200);
  
        cy.contains('Kundenfahrplan').should('exist')

        cy.contains('Betriebsfahrplan').should('exist')

        cy.contains('DA').click()

        cy.get("[value='EMeasureType_CANCELLATION_FULL']").click()

        // data-cy

        cy.get('.MuiAlert-message.css-1w0ym84').should('contain', 'Es existiert bereits eine Ist-Meldung zum Zeitpunkt')

        cy.contains('Weiter').click()

        cy.get('[data-testid="KeyboardArrowDownRoundedIcon"]').eq(1).click()

                 // data-cy

        cy.get('.MuiFilledInput-input.MuiInputBase-input.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-spfv4a').type('Ausland').type('{downArrow}').type('{enter}')
          
                  })
                   
              })

              cy.get("[data-cy='SvgArrowDown']").eq(0).click({force: true})

              cy.contains('Abmelden').click()
            
              cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
   
        })

      

  });
  
 