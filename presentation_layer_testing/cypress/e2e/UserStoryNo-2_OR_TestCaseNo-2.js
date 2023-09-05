describe('UserStoryNo-2_OR_TestCaseNo-2 - Test Suite Name', () => {

  it('AK', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
   
    var FirstName

    var LastName

    var HomePageTrainCount = 0
 

   cy.visit(`${Cypress.config().baseUrl}/?`);

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck1')
    
   cy.get('.websso-btn').click()

   cy.wait('@apiCheck1').then(({response}) => {

    expect(response.statusCode).to.eq(200);

    Test1 = 'Test1'

    FirstName = response.body.data.login.firstname

    LastName = response.body.data.login.lastname

    HomePageTrainCount = (response.body.data.trainOverview.length);

    cy.wrap(Test1).as('Test1');

    cy.wrap(FirstName).as('FirstName');

    cy.wrap(LastName).as('LastName');

    cy.wrap(HomePageTrainCount).as('HomePageTrainCount');

    })
    
    cy.get('@Test1').then(Test1 => {
    cy.log(FirstName)
    cy.log(LastName)
    cy.log(HomePageTrainCount)

     })


          cy.get("[data-cy='SvgArrowDown']").eq(0).click()

          cy.contains('Abmelden').click()

          cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')


        })
    
    })
