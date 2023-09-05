describe('empty spec', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  var Stelle1 = new Array();

  var Stelle2 = new Array();

  var intersection = new Array();

  var rowsLength

  var controlPointLocation;
  var SessionexpirationTimestamp;
  var refreshExpirationTimestamp;

  var TrainCount = 0

  var myArray = new Array()

  var RandomTrainPick = 0
  
  var TrainStelleCount = 0

  before(() => {

    /*

    cy.task('readXlsx', { file: 'cypress/fixtures/exceldata.xlsx', sheet: "Sheet1" }).then((rows) => {
      rowsLength = rows.length;
      cy.writeFile("cypress/fixtures/xlsxData.json", { rows })
    })

    cy.fixture('xlsxData').then((data) => {
      for ( let i = 0; i < rowsLength; i++) {
             Stelle1.push(data.rows[i].Stelle);
            }
          })
  })

  */

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  cy.task('readXlsx', { file: 'cypress/fixtures/220517.xlsx', sheet: "Betriebstelle_Leitstelle" }).then((rows) => {
    rowsLength = rows.length;
    cy.writeFile("cypress/fixtures/xlsxData.json", { rows })
  })
 
  cy.fixture('xlsxData').then((data) => {
    for (let i = 0; i < rowsLength; i++) {
      if (data.rows[i].LSt == 'SB Berlin') {
//            cy.log(data.rows[i].Ril100)
            Stelle1.push(data.rows[i].Ril100);
          }  
          }
        })
 })


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


  it('TC_105_106_107_119_22_Regionalisation', () => {

  
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

    TrainCount = (response.body.data.trainOverview.length);

    RandomTrainPick = Math.floor(Math.random() * TrainCount)
           
        //   cy.log(RandomTrainPick)

           cy.intercept({
              method: 'POST',
              path: '/api/v1'
            }).as('apiCheck3')

            // cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-sizeMedium.css-ts71t2').eq(RandomTrainPick).click()
            
            cy.get("[data-cy='SvgArrowRight']").eq(RandomTrainPick).click()   

            cy.wait('@apiCheck3').then(({response}) => {

              expect(response.statusCode).to.eq(200);

              cy.contains('Kundenfahrplan').should('exist')

              cy.contains('Betriebsfahrplan').should('exist')

              /*
     
            TrainStelleCount = (response.body.data.trainDetail.timeTable.length)

             for (let i = 0; i < TrainStelleCount; i++) {

                   Stelle2.push(response.body.data.trainDetail.timeTable[i].ril100);

                }

          const intersection = Stelle1.filter(element => Stelle2.includes(element));

          if (intersection.length == 0)
               {
                  throw new Error("check your stations")
   
               }*/
           })

           
 
  })


  })

  afterEach(() => {
    
    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
  })
  

})