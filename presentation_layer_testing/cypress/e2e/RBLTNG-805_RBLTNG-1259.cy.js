describe('RBLTNG-805_RBLTNG-1259', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  var TrainCount = 0
  var RandomTrainPick = 0


  var Length2 = 0

  var PlannedDepartureTime = ""
  var ActualDepartureTime = ""
 
  var PlannedArrivalTime = ""
  var ActualArrivalTime = ""

  var FirstName

  var LastName

  var TrainStart_RIL100

  var TrainStop_RIL100

  var RIL100

  /* 
    
     The customer and operating timetables (separated by tabs) are displayed on the train details page

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

        })
    
    })

    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  
  })

  /*
Timetables contain (see content) target and actual times

The attribute Delay/earliness shows the relative position of the train (RBLTNG-147) as the difference between target and actual time (actual target) in minutes at the last operating point visited. For all subsequent operating points in the train route, the calculated relative position at the last operating point used is adopted for all subsequent operating points.

AK1: After a successful login, the user name of the user can be seen in the form '<first name> <last name>'.
*/

  it('AK_AK1', () => {


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

    cy.contains(FirstName+' '+LastName).should('exist')

    TrainCount = (response.body.data.trainOverview.length);

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

        Length2 = (response.body.data.trainDetail.runway.customerStops.length)

       TrainStart_RIL100 = (response.body.data.trainDetail.relation[0].ril100)
        
       
       TrainStop_RIL100 = (response.body.data.trainDetail.relation[1].ril100)


        cy.log(Length2)


        cy.log(TrainStart_RIL100)


        cy.log(TrainStop_RIL100)

            for (let i = 0; i < Length2; i++) {

              RIL100 = (response.body.data.trainDetail.runway.customerStops[i].stop.ril100)
          
             if(RIL100!=TrainStop_RIL100)
              {

              PlannedDepartureTime = (response.body.data.trainDetail.runway.customerStops[0].stop.departure.plannedDepartureTime)
          
              ActualDepartureTime = (response.body.data.trainDetail.runway.customerStops[0].stop.departure.actualDepartureTime)

             if(PlannedDepartureTime==="" || ActualDepartureTime==="")
              {
               throw new Error("PlannedDepartureTime or ActualDepartureTime cannot be empty")
              }
              }

              if(RIL100!=TrainStart_RIL100)
              {

              PlannedArrivalTime = (response.body.data.trainDetail.runway.customerStops[0].stop.arrival.plannedArrivalTime)
         
              ActualArrivalTime = (response.body.data.trainDetail.runway.customerStops[0].stop.arrival.plannedArrivalTime)

    
             if(PlannedArrivalTime==="" || ActualArrivalTime==="")
              {
               throw new Error("PlannedArrivalTime or ActualArrivalTime cannot be empty")
              }
              }
          }
            cy.contains('Betriebsfahrplan').click()

              // data-cy

/*

            cy.get('.css-m1zl59').then((tr) => {
              counttest = tr.length;
          
              for (let i = 1; i < counttest-1; i++) {
  
                  check1 = tr[1].innerText
                  check2 = tr[i+1].innerText
                  if (check1 != check2)
  
                  {
     
                    throw new Error("For all subsequent stations/stops in the course of the train, the calculated relative position at the last station/stop used is adopted for all subsequent stations/stops")
  
                  }
   
                }
                
              })*/

            })

        })
    
    })

    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  
  })


})