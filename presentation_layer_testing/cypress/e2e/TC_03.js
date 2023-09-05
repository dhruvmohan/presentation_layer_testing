
describe('empty spec', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  var controlPointLocation;
  var SessionexpirationTimestamp;
  var refreshExpirationTimestamp;

  var TrainCount = 0

  var counttest = 0

  var myArray = new Array()

  var StatusRunning = 0
  var StatusPlanned = 0
  var StatusFinished = 0

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

    cy.get(':nth-child(1) > .MuiTableCell-alignRight').then(elm => {
           
      const InnerText = elm[0].innerText;

      cy.log(InnerText)

       })

    TrainCount = (response.body.data.trainOverview.length);
  
  //  RandomTrainPick = Math.floor(Math.random() * TrainCount)

            
           cy.intercept({
              method: 'POST',
              path: '/api/v1'
            }).as('apiCheck3')

            cy.get("[data-cy='SvgArrowRight']").eq(0).click()           
            
            cy.wait('@apiCheck3').then(({response}) => {

            expect(response.statusCode).to.eq(200);

            cy.contains('Kundenfahrplan').should('exist')

            cy.contains('Betriebsfahrplan').should('exist')

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

  afterEach(() => {
    
    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
  })

})