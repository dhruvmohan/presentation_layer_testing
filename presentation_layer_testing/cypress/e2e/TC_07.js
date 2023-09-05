describe('empty spec', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  var controlPointLocation;
  var SessionexpirationTimestamp;
  var refreshExpirationTimestamp;

  var Length = 0

  var myArray = new Array();

  var StatusRunning = 0
  var StatusPlanned = 0
  var StatusFinished = 0

  var TrainNumber = 0

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

  it('TC_92_93_63_64_65_66_Target_ActualTime', () => {
   
    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck2')

    cy.reload()

    cy.wait('@apiCheck2') // discard

    cy.wait('@apiCheck2') // discard
    
    cy.wait('@apiCheck2').then(({response}) => {

    expect(response.statusCode).to.eq(200);

    cy.contains('RBL TNG').should('exist')

    cy.contains('Zugübersicht').should('exist')

 // cy.log(JSON.stringify(response.body.data.trainOverview[1].runningStatus))
      
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

            }

            else if(RunningStatus==="FINISHED")
            {
                  StatusFinished++;

                  TrainNumber = (response.body.data.trainOverview[i].trainNumber)
    
                  myArray.push(TrainNumber);
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
           
          for (let i = 0; i < myArray.length; i++) {

            cy.get('#mui-1').clear()
            
            cy.get('#mui-1').type(myArray[i])

            cy.contains(myArray[i]).should('not.exist')
                     
          }

  })

 
  })

  afterEach(() => {
    
    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
  })

})