describe('Future Trains', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  var TrainCount = 0

  var NoofFutureTrains = 0;

  var RunningStatus = ""

  var StatusRunning = 0
  var StatusPlanned = 0
  var StatusFinished = 0

  var myArray = new Array();

  var myArray2 = new Array();

  var DepartureTime;

  var Timetest = 1;

  var FiveMinLaterTimeFinal = 0

  var TrainTime = 0

  var FiveMinLaterTimeFinalTime



  it('AK_01', () => {
    

    // Application URL should be accessible

   // cy.visit(`${Cypress.config().baseUrl}/?`);


    cy.visit('https://rbl-tu1.rbl-test.comp.db.de')

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

      var currentDateObj = new Date();
      var numberOfMlSeconds = currentDateObj.getTime();
      var addMlSeconds = 5 * 60 * 1000;
      var FiveMinLaterTimeFinal = new Date(numberOfMlSeconds + addMlSeconds);

      var test = new Date(FiveMinLaterTimeFinal)

      for (let i = 0; i < TrainCount; i++) {
           
  //        cy.log(FiveMinLaterTime.getTime())
    
          RunningStatus = (response.body.data.trainOverview[i].metaInfo.runningStatus)

          cy.log(RunningStatus)

          if (RunningStatus == "ERunningStatus_RUNNING" || RunningStatus == "ERunningStatus_FINISHED" || RunningStatus == "ERunningStatus_PLANNED" || RunningStatus == "ERunningStatus_UNDEFINED") 
          {
            if (RunningStatus === "ERunningStatus_RUNNING") {
              StatusRunning++;
            }

            else if (RunningStatus === "ERunningStatus_PLANNED") {

              StatusPlanned++;

              DepartureTime = (response.body.data.trainOverview[i].departureTime)

              const date1 = new Date(DepartureTime)

              myArray.push(DepartureTime);

              // cy.log(date1.getTime());

              // cy.log(FiveMinLaterTimeFinal.getTime())

             TrainTime = date1.getTime()

             FiveMinLaterTimeFinalTime = FiveMinLaterTimeFinal.getTime()

             var check = FiveMinLaterTimeFinalTime - TrainTime
                                  
             myArray2.push(check);

            }

            else if (RunningStatus === "ERunningStatus_PLANNED") {
              StatusFinished++;
            }

          }
          else {
          throw new Error("Train does not have any RunningStatus from Planned, Running or Finished")
          }

        }

        cy.log("No of trains in Planned Status =" + StatusPlanned)
        cy.log("No of trains in Finished Status =" + StatusFinished)

   /*     if (StatusPlanned > 0)
        {

        for (let i = 0; i < myArray.length; i++) {
          if (myArray[i + 1] >= myArray[i]) {
            Timetest++;

          }

     //     else 
     //     {
     //       cy.log(myArray[i]);
     //     }
        }

        if (StatusPlanned === Timetest) {
          cy.log('All times in Ascending Order')

       }
        else if (StatusPlanned != Timetest)
        {
         throw new Error("Train not arranged in Ascending Order of time")
        }
      }

      else
      {
        cy.log("No trains in Planned Status")
      }*/
/*
       for (let i = 0; i < myArray2.length; i++) {

        cy.log(myArray2[i])

        if (myArray2[i] >= 300000) {
            throw new Error("Only the trains with Sceduled departure time within next 5 min should be displayed")
        }
      }
      */
      })

      cy.get("[data-cy='SvgArrowDown']").eq(0).click()

      cy.contains('Abmelden').click()
  
      cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

})
})
