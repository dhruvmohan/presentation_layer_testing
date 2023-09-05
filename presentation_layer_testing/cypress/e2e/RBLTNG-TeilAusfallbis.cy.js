describe('TeilAusfallbis', () => {

  var Length

  var TrainPick

  var RunningStatus
  var CurrentPosition
  var RelationFrom
  var RelationTo

  var NoofBahnhof


  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
 
  it('TeilAusfallbis', () => {
   
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

      Length = (response.body.data.trainOverview.length);

        cy.contains('RBL TNG').should('exist')

        cy.contains('Zugübersicht').should('exist')

        if(Length==0)
        {
          throw new Error("no train found")
        }
         
      for (let i = 0; i < Length; i++) {

        RunningStatus = (response.body.data.trainOverview[i].metaInfo.runningStatus)

        CurrentPosition = (response.body.data.trainOverview[i].position.ril100)
        RelationFrom = (response.body.data.trainOverview[i].relation[0].ril100)
        RelationTo = (response.body.data.trainOverview[i].relation[1].ril100)

            if (RunningStatus==="ERunningStatus_RUNNING" && response.body.data.trainOverview[i].measureInfo == null && CurrentPosition != RelationFrom && CurrentPosition != RelationTo &&  response.body.data.trainOverview[i].metaInfo.metaInfo.trainFamily == 'S')
            {
              TrainPick = i;
              break;
            }  
              
        }

        cy.intercept({
                method: 'POST',
                path: '/api/v1'
              }).as('apiCheck3')
                          
            cy.get("[data-cy='SvgArrowRight']").eq(TrainPick).click()   

            cy.wait(10000)

            cy.wait('@apiCheck3').then(({response}) => {

            expect(response.statusCode).to.eq(200);


        cy.contains('Kundenfahrplan').should('exist')

        cy.contains('Betriebsfahrplan').should('exist')

        cy.get('[type="button"]').contains('DA').click()

        cy.get('[value="EMeasureType_CANCELLATION_TO"]').click() 

        cy.get('[role="combobox"]').eq(1).type('{upArrow}').type('{enter}');

        cy.wait(10000)

        cy.contains('Weiter').click()

        cy.get('[data-testid="KeyboardArrowDownRoundedIcon"]').eq(1).click()

        cy.wait(10000)

        cy.get('[role="combobox"]').type('Anschluss Zug').type('{downArrow}').type('{enter}');
        
        cy.contains('Ausführen').click()

        cy.reload()

        cy.wait(10000)

        // data-cy

        cy.contains('fällt von').should('exist')
     
        })
      })  

           cy.get("[data-cy='SvgArrowDown']").eq(0).click()

           cy.contains('Abmelden').click()
         
           cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
         

  });
  
}) 