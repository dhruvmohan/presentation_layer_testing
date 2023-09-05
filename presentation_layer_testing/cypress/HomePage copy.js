class HomePage {

apicheck()
{
    cy.intercept({
        method: 'POST',
        path: '/api/v1'
      }).as('apiCheck')

}

storeValue(){

    var FirstName

    var LastName

    var HomePageTrainCount = 0

    var Test1

    cy.wait(10000)

    cy.wait('@apiCheck').then(({response}) => {

        expect(response.statusCode).to.eq(200);

        Test1 = 'Test1'

        HomePageTrainCount = (response.body.FirstName);

        cy.log(HomePageTrainCount)
    
 /*       FirstName = response.body.data.login.firstname
    
        LastName = response.body.data.login.lastname
    
 //       HomePageTrainCount = (response.body.data.trainOverview.length);
    
        cy.wrap(Test1).as('Test1');
    
        cy.wrap(FirstName).as('FirstName');
    
        cy.wrap(LastName).as('LastName');
    
        cy.wrap(HomePageTrainCount).as('HomePageTrainCount');

        cy.get('@Test1').then(Test1 => {
            cy.log(FirstName)
            cy.log(LastName)
            cy.log(HomePageTrainCount)


    
        })  
        
        */
    })
}

checkTab(){
    cy.get("[aria-label='Abw']").should('contain', 'Abw')
}

checkTags()
{
    cy.contains('RBL TNG').should('exist')

    cy.contains('Zugübersicht').should('exist')
}

selectRandomTrain()
{

    cy.get('@Test1').then(Test1 => {

        RandomTrainPick = Math.floor(Math.random() * HomePageTrainCount)
        cy.get("[data-cy='SvgArrowRight']").eq(RandomTrainPick).click()

    })

}

}
export default HomePage