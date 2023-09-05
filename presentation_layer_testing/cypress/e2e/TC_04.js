import "cypress-real-events/support";

describe('TC_117_118_Zurück zur Zugübersicht', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

    var Length = 0

    var RandomTrainPick = 0

    let check = ''

    beforeEach(() => {
    

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
  
      cy.log(JSON.stringify(response.body.data.login.expirationTimestamp))
      
      SessionexpirationTimestamp= response.body.data.login.expirationTimestamp
      const c = new Date(SessionexpirationTimestamp)
      cy.log(c.toISOString())
  
      refreshExpirationTimestamp = response.body.data.login.refreshExpirationTimestamp
      const d = new Date(refreshExpirationTimestamp)
      cy.log(d.toISOString())
  
      const e = new Date(Date.now())
      cy.log(e.toISOString())
  
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
    })
  


it('TC_117_118_Zurück zur Zugübersicht', () => {

  cy.intercept({
    method: 'POST',
    path: '/api/v1'
  }).as('apiCheck2')

  cy.reload()

  cy.wait('@apiCheck2') // discard

  cy.wait('@apiCheck2') // discard
  
  cy.wait('@apiCheck2').then(({response}) => {

  cy.log(response.body)

  expect(response.statusCode).to.eq(200);

    cy.contains('RBL TNG').should('exist')

    cy.contains('Zugübersicht').should('exist')

    Length = (response.body.data.trainOverview.length);
      
    RandomTrainPick = Math.floor(Math.random() * Length)
           
    cy.intercept({
              method: 'POST',
              path: '/api/v1'
            }).as('apiCheck3')

            cy.get("[data-cy='SvgArrowRight']").eq(RandomTrainPick).click()   
       
          cy.wait('@apiCheck3').then(({response}) => {

          expect(response.statusCode).to.eq(200);

          cy.contains('Kundenfahrplan').should('exist')

          cy.contains('Betriebsfahrplan').should('exist')

          /*

          cy.get('.selected.ui-MapTrain--Container.css-oz3vf2').trigger('mouseover')

          cy.get("[aria-labelledby*='mui-']").should('exist')
  
          cy.get('[data-testid="gps-type"]').then(elm => {
            check = elm[0].innerText
            cy.log(check)

            if (check== 'LeiDis')
            {

                cy.log(check)    
            
            }
          });


/*
          cy.get('[stroke-linejoin="round"]').eq(2).should('be.visible')
     

          cy.get('[area-labelledby="mui-3167"]').then(elm => {
           
            const InnerText = elm[0].innerText;
           
               cy.log(InnerText)
  })
               */
 
         

        })
    
    })


  })

  afterEach(() => {
    
    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
  })


  })
  
  