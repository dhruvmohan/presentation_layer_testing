// type definitions for Cypress object "cy"
// <reference types="cypress" />

import  HomePage  from '../HomePage.js';

describe('TC_100_Train_NotStarted', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });


  var Length = 0

  var StatusRunning = 0
  var StatusPlanned = 0
  var StatusFinished = 0

  var TrainNumber = 0

  var myArray = new Array()

  var Line = ""
  var TrainNumber = 0
  var Category = ""
  var RunningStatus = ""
  var DelayMinutes = 0

  var RandomTrainPick = 0

  var Length2 = 0

  var PlannedDepartureTime = ""
  var PlannedActualTime = ""

  var PlannedArrivalTime = ""
  var ActualArrivalTime = ""
  
  var Type = ""
  var isCustomerPoint = false

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

  it('TC_100_Train_NotStarted', () => {

        
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
      
      for (let i = 0; i < Length; i++) {

        RunningStatus = (response.body.data.trainOverview[i].runningStatus)

        if(RunningStatus==="RUNNING" || RunningStatus==="PLANNED" || RunningStatus==="FINISHED")
          {
            if(RunningStatus==="RUNNING")
            {
                 StatusRunning++;
            }

            else if(RunningStatus==="PLANNED")
            {
                  StatusPlanned++;

                  TrainNumber = (response.body.data.trainOverview[i].trainNumber);

                  myArray.push(TrainNumber);

            }

            else if(RunningStatus==="FINISHED")
            {
                  StatusFinished++;

            }

          }
          else
          {
            throw new Error("Train does not have any RunningStatus from Planned, Running or Finished")
          }
                            
           }

           cy.log("No. of trains in Running Status ="+StatusRunning)
           cy.log("No of trains in Planned Status ="+StatusPlanned)
           cy.log("No of trains in Finished Status ="+StatusFinished)

           if (StatusPlanned > 0)
           {

           cy.intercept({
              method: 'POST',
              path: '/api/v1'
            }).as('apiCheck3')


          Length2 = (myArray.length);  

          RandomTrainPick = Math.floor(Math.random() * Length2)


          cy.contains(myArray[RandomTrainPick]).click()
            
          cy.wait('@apiCheck3').then(({response}) => {

          expect(response.statusCode).to.eq(200);

          cy.contains('Kundenfahrplan').should('exist')

          cy.contains('Betriebsfahrplan').should('exist')
 
          cy.get('path[stroke="white"]').should('not.exist')             
        
          cy.contains('Betriebsfahrplan').click()

          cy.get('path[stroke="white"]').should('not.exist')

        })
      }

      else
      {
        cy.log("No trains for future")
      }
    
   })
  
  })

 


})