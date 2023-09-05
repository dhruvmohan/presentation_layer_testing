
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

  var Timetest = 0;

  var FiveMinLaterTimeFinal = 0

  var TrainTime = 0

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


  it('TC_17_18_19_20_21_Future Trains', () => {

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck2')
  
    cy.reload()
  
      cy.get('body').then(($body) => {

        if ($body.find('.MuiTypography-root.MuiTypography-body1.css-13b62jx').length) {

          NoofFutureTrains = cy.get('.MuiTypography-root.MuiTypography-body1.css-13b62jx').length;

          cy.log('Number of trains in Planned status ' + $body.find('.MuiTypography-root.MuiTypography-body1.css-13b62jx').length)

          cy.get('.MuiTypography-root.MuiTypography-body1.css-13b62jx').should('contain', 'Ab')

          cy.get('.MuiTypography-root.MuiTypography-body1.css-13b62jx').eq(0).trigger('mouseover')

          cy.get('[role="tooltip"]').then(elm => {
            cy.log(elm[0].innerText)
            const InnerText = elm[0].innerText
            expect(InnerText).to.contains('Geplante Abfahrtszeit')
          });
      

        }
      })

      cy.wait('@apiCheck2') // discard
  
      cy.wait('@apiCheck2') // discard
      
      cy.wait('@apiCheck2').then(({response}) => {

        cy.log(response.body)
        
      expect(response.statusCode).to.eq(200);

      cy.contains('RBL TNG').should('exist')
  
      cy.contains('Zugübersicht').should('exist')

      TrainCount = (response.body.data.trainOverview.length);

      var currentDateObj = new Date();
      var numberOfMlSeconds = currentDateObj.getTime();
      var addMlSeconds = 5 * 60 * 1000;
      var FiveMinLaterTimeFinal = new Date(numberOfMlSeconds + addMlSeconds);

      var test = new Date(addMlSeconds)

      for (let i = 0; i < TrainCount; i++) {

       
    
  //        cy.log(FiveMinLaterTime.getTime())
    
          RunningStatus = (response.body.data.trainOverview[i].runningStatus)

          if (RunningStatus === "RUNNING" || RunningStatus === "PLANNED" || RunningStatus === "FINISHED") {
            if (RunningStatus === "RUNNING") {
              StatusRunning++;
            }

            else if (RunningStatus === "PLANNED") {

              StatusPlanned++;

              DepartureTime = (response.body.data.trainOverview[i].departureTime)

              const date1 = new Date(DepartureTime)

              myArray.push(DepartureTime);

                              // cy.log(date1.getTime());

             TrainTime = date1.getTime()

             var check = FiveMinLaterTimeFinal - TrainTime
                
                          //    cy.log((check).getMinutes())
                
             myArray2.push(check);


            }

            else if (RunningStatus === "FINISHED") {
              StatusFinished++;
            }

          }
          else {
            throw new Error("Train does not have any RunningStatus from Planned, Running or Finished")
          }

        }

        cy.log("No of trains in Planned Status =" + StatusPlanned)
        cy.log("No of trains in Finished Status =" + StatusFinished)

        if (StatusPlanned > 0)
        {

        for (let i = 0; i < myArray.length; i++) {
          if (myArray[i + 1] >= myArray[i]) {
            Timetest++;

          }

          else 
          {
            cy.log(myArray[i]);
          }
        }

        cy.log(Timetest);

        cy.log(StatusPlanned);

        if (StatusPlanned === Timetest) {
          cy.log('All times in Ascending Order')

       }
        else if (StatusPlanned != Timetest)
        {
  //        throw new Error("Train not arranged in Ascending Order of time")

       }
      }

      else
      {
        cy.log("No trains in Planned Status")
      }

       for (let i = 0; i < myArray2.length; i++) {
        if (myArray2[i] >= 300000) {
          throw new Error("Only the trains with Sceduled departure time within next 5 min should be displayed")
        }
      }
      })

      cy.get("[data-cy='SvgArrowDown']").eq(0).click()

      cy.contains('Abmelden').click()
  
      cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  })

})

