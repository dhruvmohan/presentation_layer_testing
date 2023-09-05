describe('RBLTNG-3518', () => {

  var Length
  var TrainPick
  var RandNo
  var Measurefrom
  var Measureto
  var TrainCount = 0
  var RunningStatus = ""
  var StatusPlanned =0
  var DepartureTime
  var myArray = new Array();
  var Timetest = 0;




  var Length

  var TrainPick

  var RunningStatus
  var CurrentPosition
  var RelationFrom
  var RelationTo



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

  it('TeilAusfallab', () => {
   
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

        cy.get('[value="EMeasureType_CANCELLATION_FROM"]').click() 

        cy.get('[role="combobox"]').eq(0).type(CurrentPosition).type('{downArrow}').type('{enter}');

        cy.wait(10000)

        cy.contains('Weiter').click()

        cy.get('[data-testid="KeyboardArrowDownRoundedIcon"]').eq(1).click()

        cy.wait(10000)

        cy.get('[role="combobox"]').type('Anschluss Zug').type('{downArrow}').type('{enter}');
        
        cy.contains('Ausführen').click()

        cy.reload()

        cy.wait(10000)

        // data-cy

        cy.contains('fällt ab').should('exist')
     
        })
      })  

           cy.get("[data-cy='SvgArrowDown']").eq(0).click()

           cy.contains('Abmelden').click()
         
           cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
         

  });

  

  /*
    AK2: the DZ button is only enabled if a failure/partial failure has been created

    */

  it('AK2_1', () => {

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

        if (response.body.data.trainOverview[i].measureInfo != null  && response.body.data.trainOverview[i].measureInfo.measuresHistory[1] == null && response.body.data.trainOverview[i].replacementFor == null && response.body.data.trainOverview[i].replacementBy == null) {
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

        cy.contains('Kundenfahrplan').should('exist')

        cy.contains('Betriebsfahrplan').should('exist')

        cy.get('[type="button"]').contains('DZ').should('be.enabled')
      })
    })

    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  })

  
  /*
  //  AK2: the DZ button is only enabled if a failure/partial failure has been created
*/

  it('AK2_2', () => {

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

        if (response.body.data.trainOverview[i].measureInfo == null  && response.body.data.trainOverview[i].replacementFor == null && response.body.data.trainOverview[i].replacementBy == null) {
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

        cy.contains('Kundenfahrplan').should('exist')

        cy.contains('Betriebsfahrplan').should('exist')

        cy.get('[type="button"]').contains('DZ').should('be.disabled')
      })
    })

    cy.get("[data-cy='SvgArrowDown']").eq(0).click({ force: true })

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  })


  /*
  
  AK3: In the replacement train mask, the user can enter the replacement train number in a text field. There is no exam here.
  
  AK4.1 : If there is a total failure, then the replacement train runs = the main train runs
  AK4.2: If partial failure from, then replacement train run = partial failure from main train
  AK4.3: If partial failure until, then replacement train run = partial failure until main train
  
  AK5: Train run can be adjusted by the user. The operating points are the list of operating points of the main train.
  
  AK6: Order of the operating points corresponds to the customer timetable of the main train and from the starting station / to the destination station can only be selected in the order of the operating points of the customer timetable - so to speak, to the destination station, do not select a "smaller" operating point.
  
  AK7: Start and destination station must not be identical, field "From start station" can never contain the end station of the customer timetable, and field "To destination station" can never contain the start station of the customer timetable.
  
  AK10: Fields "Replacement train number", "From departure station", "To destination station" are mandatory and the Next button is disabled as long as these fields are not filled out
  
  AK14 : If the replacement move is successfully created using the 'execute' button, the following is saved:
  1. Replacement move itself, the replacement move has a relation to its main move. The user is then returned to the standard view of the train details of the main train.
  2. Type of measure: replacement train. The measure has a relation to the main train (just like failure/partial failure).
  
*/
  it('AK3_AK4_AK5_AK7_AK10_AK14', () => {

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

        // data-cy

        cy.get('.MuiFilledInput-input.MuiInputBase-input.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-spfv4a').
          invoke('val')
          .then(($text) => {
            expect($text).to.contain(Measurefrom)
          })


        // data-cy

        cy.get('.MuiFilledInput-input.MuiInputBase-input.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-spfv4a').eq(1).
          invoke('val')
          .then(($text) => {

            expect($text).to.contain(Measureto)

            // data-cy
            cy.get('.MuiSvgIcon-root.MuiSvgIcon-fontSizeSmall.css-1k33q06').eq(0).click({ force: true })

            cy.get('[role="combobox"]').eq(0).type(Measurefrom).type('{downArrow}').type('{enter}');


            cy.get('.MuiSvgIcon-root.MuiSvgIcon-fontSizeSmall.css-1k33q06').eq(1).click({ force: true })

            cy.get('[role="combobox"]').eq(1).type(Measureto).type('{downArrow}').type('{enter}');


            // data-cy

            cy.get('.MuiSvgIcon-root.MuiSvgIcon-fontSizeSmall.css-1k33q06').eq(0).click({ force: true })

            cy.get('[role="combobox"]').eq(0).type(Measureto)

            cy.contains('Weiter').should('be.disabled')

            // data-cy

            cy.get('.MuiSvgIcon-root.MuiSvgIcon-fontSizeSmall.css-1k33q06').eq(0).click({ force: true })

            cy.get('[role="combobox"]').eq(0).type(Measurefrom).type('{downArrow}').type('{enter}');


            cy.get('[role="combobox"]').eq(1).type(Measurefrom)

            cy.contains('Weiter').should('be.disabled')

            cy.get('[role="combobox"]').eq(1).clear()

            cy.get('[role="combobox"]').eq(1).type(Measureto).type('{downArrow}').type('{enter}');

            cy.contains('Weiter').click()

            cy.contains('Ausführen').click()

            cy.wait(10000)

            cy.reload()

            cy.wait(10000)

            cy.contains('Es verkehrt Ersatzzug').should('exist')

            cy.contains('Zurück zur vorherigen Seite').click()

            cy.intercept({
              method: 'POST',
              path: '/api/v1'
            }).as('apiCheck4')

            cy.reload()

            cy.wait(10000)

          //  cy.wait('@apiCheck4') // discard

            cy.wait('@apiCheck4').then(({ response }) => {

              cy.log(response.body)

              expect(response.statusCode).to.eq(200);

              cy.contains('RBL TNG').should('exist')

              cy.contains('Zugübersicht').should('exist')

              TrainCount = (response.body.data.trainOverview.length);

              for (let i = 0; i < TrainCount; i++) {

                RunningStatus = (response.body.data.trainOverview[i].metaInfo.runningStatus)

                if (RunningStatus === "ERunningStatus_RUNNING" || RunningStatus === "ERunningStatus_PLANNED" || RunningStatus === "ERunningStatus_FINISHED") {

                  if (RunningStatus === "ERunningStatus_PLANNED") {

                    StatusPlanned++;
                    DepartureTime = (response.body.data.trainOverview[i].departureTime)

                    myArray.push(DepartureTime);


                  }

                }


              }

              if (StatusPlanned > 0) {

                for (let i = 0; i < myArray.length; i++) {
                  if (myArray[i + 1] >= myArray[i]) {
                    Timetest++;

                  }

                  else {
                    cy.log(myArray[i]);
                  }
                }

                cy.log(Timetest);

                cy.log(StatusPlanned);

                if (StatusPlanned === Timetest) {
                  cy.log('All times in Ascending Order')

                }
                else if (StatusPlanned != Timetest) {
                  //        throw new Error("Train not arranged in Ascending Order of time")

                }
              }

              else {
                cy.log("No trains in Planned Status")
              }


            })

          })


      })
    })  


    cy.get("[data-cy='SvgArrowDown']").eq(0).click({ force: true })

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  })


  it('Check_Ersatzug', () => {

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

      expect(response.statusCode).to.eq(200);

      cy.contains('RBL TNG').should('exist')

      cy.contains('Zugübersicht').should('exist')

      TrainCount = (response.body.data.trainOverview.length);

      for (let i = 0; i < TrainCount; i++) {

        RunningStatus = (response.body.data.trainOverview[i].metaInfo.runningStatus)

        if (RunningStatus === "ERunningStatus_PLANNED") {

            StatusPlanned++;
            DepartureTime = (response.body.data.trainOverview[i].departureTime)

            myArray.push(DepartureTime);

        }


      }

      if (StatusPlanned > 0) {

        for (let i = 0; i < myArray.length; i++) {
          if (myArray[i + 1] >= myArray[i]) {
            Timetest++;

          }

          else {
            cy.log(myArray[i]);
          }
        }

        cy.log(Timetest);

        cy.log(StatusPlanned);

        if (StatusPlanned === Timetest) {
          cy.log('All times in Ascending Order')

        }
        else if (StatusPlanned != Timetest) {
          //        throw new Error("Train not arranged in Ascending Order of time")

        }
      }

      else {
        cy.log("No trains in Planned Status")
      }







    })


    cy.get("[data-cy='SvgArrowDown']").eq(0).click({ force: true })

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')


  })


  /*
  AK9: If the DZ button is selected, the timetable always jumps to the customer timetable and the operating timetable is disabled for the duration of the replacement train dialog window
  
  AK12: If the process was aborted by the user using the 'Cancel' button, the replacement train was not saved in the system and the user is returned to the standard view of the train details of the main train.

*/
  it('AK9_12', () => {

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


        if (response.body.data.trainOverview[i].measureInfo != null && response.body.data.trainOverview[i].measureInfo.measuresHistory[1] == null && response.body.data.trainOverview[i].replacementFor == null && response.body.data.trainOverview[i].replacementBy == null) {
          TrainPick = i;

          break;

          //         Measurefrom = (response.body.data.trainOverview[i].measureInfo.measuresHistory[0].from.ril100)

          //         Measureto = (response.body.data.trainOverview[i].measureInfo.measuresHistory[0].to.ril100)

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

        cy.contains('Betriebsfahrplan').should('be.disabled')

        cy.contains('Abbrechen').click()

        cy.reload()

        cy.wait(10000)

        cy.contains('Es verkehrt Ersatzzug').should('not.exist')


      })


    })


    cy.get("[data-cy='SvgArrowDown']").eq(0).click({ force: true })

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')


  })
}) 