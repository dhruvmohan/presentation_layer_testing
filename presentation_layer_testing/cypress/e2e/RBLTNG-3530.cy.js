describe('RBLTNG-3518', () => {

  var Length

  var TrainPick
  
  var RandNo

  var Measurefrom

  var Measureto

  var TrainCount = 0

  var RunningStatus = ""

  var StatusPlanned =0

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
 
  it('VollAusfall', () => {
   
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

       if((RunningStatus==="ERunningStatus_RUNNING" || RunningStatus==="ERunningStatus_PLANNED" || RunningStatus==="ERunningStatus_FINISHED") && response.body.data.trainOverview[i].measureInfo == null &&  response.body.data.trainOverview[i].metaInfo.metaInfo.trainFamily == 'S')
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

        cy.wait(10000)

        cy.get('[value="EMeasureType_CANCELLATION_FULL"]').click() 

        cy.wait(10000)

        cy.contains('Weiter').click()

        cy.wait(10000)

        cy.get('[data-testid="KeyboardArrowDownRoundedIcon"]').eq(1).click()

        cy.wait(10000)

        cy.get('[role="combobox"]').type('Anschluss Zug').type('{downArrow}').type('{enter}');
        
        cy.contains('Ausführen').click()

        cy.reload()

        cy.wait(10000)

        // data-cy

        cy.get('.MuiTypography-root.MuiTypography-bodyRegular.css-1qj5rln').should('contain', 'fällt aus')
      
        })
      })  

           cy.get("[data-cy='SvgArrowDown']").eq(0).click({force: true})

           cy.contains('Abmelden').click()
         
           cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
         

  });

  
  it('Create_Ersatzug', () => {

    cy.visit(`${Cypress.config().baseUrl}/?`);

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck1')

    cy.get('.websso-btn').click()

    cy.wait('@apiCheck1').then(({ response }) => {

      expect(response.statusCode).to.eq(200);

    })

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck2')

    cy.reload()

    cy.wait(10000)

    cy.wait('@apiCheck2') // discard

    cy.wait('@apiCheck2').then(({ response }) => {

      expect(response.statusCode).to.eq(200);

      Length = (response.body.data.trainOverview.length);

      cy.contains('RBL TNG').should('exist')

      cy.contains('Zugübersicht').should('exist')

      if (Length == 0) {
        throw new Error("no train found")
      }

      for (let i = 0; i < Length; i++) {

        if (response.body.data.trainOverview[i].measureInfo != null  && response.body.data.trainOverview[i].measureInfo.measuresHistory[1] == null  && response.body.data.trainOverview[i].replacementFor == null && response.body.data.trainOverview[i].replacementBy == null) {
          TrainPick = i;

          Measurefrom = (response.body.data.trainOverview[i].measureInfo.measuresHistory[0].from.ril100)

          Measureto = (response.body.data.trainOverview[i].measureInfo.measuresHistory[0].to.ril100)

          break;

        }

      }
      cy.intercept({
        method: 'POST',
        path: '/api/v1'
      }).as('apiCheck3')

      cy.get("[data-cy='SvgArrowRight']").eq(TrainPick).click()

      cy.wait(10000)

      cy.wait('@apiCheck3').then(({ response }) => {

        expect(response.statusCode).to.eq(200);

        cy.contains('Kundenfahrplan').should('exist')

        cy.contains('Betriebsfahrplan').should('exist')

        cy.get('[type="button"]').contains('DZ').click()

        RandNo = Math.floor(Math.random() * 1000)

        // data-cy

        cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').type('ZAut'.concat(RandNo))



            cy.contains('Weiter').click()

            cy.contains('Ausführen').click()

            cy.wait(10000)

            cy.reload()

            cy.wait(10000)

            cy.contains('Es verkehrt Ersatzzug').should('exist')

      })
    })  


    cy.get("[data-cy='SvgArrowDown']").eq(0).click({ force: true })

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  })

  /*

AK1:  A train symbol with "E" as a suffix to the train number is displayed on the replacement train - see Figma
AK2:  A tooltip is displayed when mouse-over the train symbol
AK3:  ToolTip contains text "Replacement train for", class and train number of the main train and is a direct-link to the train details of the replacement train

*/

  it('AK1_AK2', () => {

    cy.visit(`${Cypress.config().baseUrl}/?`);

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck1')

    cy.get('.websso-btn').click()

    cy.wait('@apiCheck1').then(({ response }) => {

      expect(response.statusCode).to.eq(200);

    })

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck2')

    cy.reload()

    cy.wait(10000)

    cy.wait('@apiCheck2') // discard

    cy.wait('@apiCheck2').then(({ response }) => {

      expect(response.statusCode).to.eq(200);

      Length = (response.body.data.trainOverview.length);

      cy.contains('RBL TNG').should('exist')

      cy.contains('Zugübersicht').should('exist')

      if (Length == 0) {
        throw new Error("no train found")
      }

      for (let i = 0; i < Length; i++) {

        if (response.body.data.trainOverview[i].measureInfo != null  &&  response.body.data.trainOverview[i].replacementFor != null) {
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

      cy.wait('@apiCheck3').then(({ response }) => {

        expect(response.statusCode).to.eq(200);

        cy.get('[data-cy="SvgTrainErsatz"]').trigger('mouseover')

        cy.get('[role="tooltip"]').eq(0).then(elm => {

          const InnerText = elm[0].innerText;

          expect(InnerText).to.equal('Ersatzzug für');
            
          
  
         })
        

     
      })
    })  


    cy.get("[data-cy='SvgArrowDown']").eq(0).click({ force: true })

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  })

  

}) 