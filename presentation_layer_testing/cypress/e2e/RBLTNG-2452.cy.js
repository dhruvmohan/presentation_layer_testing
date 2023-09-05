
describe('RBLTNG-2452', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });


  var RoleCount = 0

  var RoleName = new Array();

  var Randno

  var LastRoleName

  var Last_AD_GroupName


/*

AK1 : System allows the admin to create a new role (fields/design see Figma link) 
Once the role has been created and saved, the list will be sorted alphabetically by role name

AK6 : The authorization groups are sorted user-defined, from left to right: monitor , dispatch , administrate

*/


it('AK1_AK6', () => {
 
    
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

  cy.wait('@apiCheck2').then(({response}) => {

  expect(response.statusCode).to.eq(200);

  
})
 cy.contains('RBL TNG').should('exist')

 cy.contains('Zugübersicht').should('exist')

  cy.get("[data-cy='SvgArrowDown']").click()

  cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck3')
 
  cy.contains('Administration').click()

  cy.wait('@apiCheck3')

  cy.wait('@apiCheck3').then(({response}) => {

    expect(response.statusCode).to.eq(200);

    cy.contains('Administration/Rollen').should('exist')

    Randno = Math.floor(Math.random() * 100000)

    cy.contains('Rolle erstellen').click()

    // data-cy

    // data-cy

    cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(0).type('ZAutomation_AD_GroupName'+ Randno)

    cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(1).type('ZAutomation_RoleName_'+ Randno)

          // data-cy

    cy.get('.MuiTypography-root.MuiTypography-bodyRegular.MuiFormControlLabel-label.css-1qj5rln')
    .eq(0)
    .should('have.text', 'Überwachen')
    
    
          // data-cy
    cy.get('.MuiTypography-root.MuiTypography-bodyRegular.MuiFormControlLabel-label.css-1qj5rln')
    .eq(1)
    .should('have.text', 'Disponieren')

          // data-cy
    
    cy.get('.MuiTypography-root.MuiTypography-bodyRegular.MuiFormControlLabel-label.css-1qj5rln')
    .eq(2)
    .should('have.text', 'Administrieren - regional')

          // data-cy
    
    cy.get('.MuiTypography-root.MuiTypography-bodyRegular.MuiFormControlLabel-label.css-1qj5rln')
    .eq(3)
    .should('have.text', 'Administrieren')

    cy.log('The authorization groups are sorted user-defined, from left to right: monitor , dispatch , administrate')


    cy.contains('Überwachen').click()

    cy.contains('Disponieren').click()

    cy.get("[data-cy='SvgCheck']").eq(0).click()

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck4')

    cy.reload()

    cy.wait(10000)

    cy.wait('@apiCheck4')

    cy.wait('@apiCheck4')

    cy.wait('@apiCheck4').then(({response}) => {

      RoleCount = response.body.data.roles.length;

      for (let j = 0; j < RoleCount; j++) {

        RoleName.push(response.body.data.roles[j].name);

      }
    
      let second_index;
    
      for(let first_index = 0; first_index < RoleName.length; first_index++){
    
        second_index = first_index + 1;
    
        if(RoleName[second_index] - RoleName[first_index] < 0) 
        {
          throw new Error("Role names are not in Ascending order")
        }
      } 
      cy.log('Role names are in Ascending order');
     
      })

  })

                  
  cy.get("[data-cy='SvgArrowDown']").eq(0).click()
  
  cy.contains('Abmelden').click()

  cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

})

/*

AK2 : System allows the admin to customize a role (the following attributes can be customized, Description , ACAT ID)

AK4 : Admin can assign/remove and save permissions to a role
*/

it('AK2_AK4', () => {


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

cy.wait('@apiCheck2').then(({response}) => {

expect(response.statusCode).to.eq(200);


})
cy.contains('RBL TNG').should('exist')

cy.contains('Zugübersicht').should('exist')

cy.get("[data-cy='SvgArrowDown']").click()

cy.intercept({
    method: 'POST',
    path: '/api/v1'
  }).as('apiCheck3')

cy.contains('Administration').click()

cy.wait('@apiCheck3')

cy.wait('@apiCheck3').then(({response}) => {

  expect(response.statusCode).to.eq(200);

  cy.contains('Administration/Rollen').should('exist')

  RoleCount = response.body.data.roles.length;

    cy.get("[data-cy='SvgEdit']").eq(RoleCount-1).click()

    Randno = Math.floor(Math.random() * 100000)

    cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(0).clear()

    cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(1).clear()

    cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(0).type('ZAutomation_AD_GroupName'+ Randno)

    cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(1).type('ZAutomation_RoleName_'+ Randno)

    cy.contains('Überwachen').click({force: true})

    cy.contains('Disponieren').click({force: true})

    cy.contains('Administrieren').click({force: true})

    cy.get("[data-cy='SvgCheck']").eq(0).click({force: true})

})
               
  cy.get("[data-cy='SvgArrowDown']").eq(0).click()
  
  cy.contains('Abmelden').click()

  cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

})


/*
AK3 : System allows admin to delete a role

*/


it('AK3', () => {
 
    
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

  cy.wait('@apiCheck2').then(({response}) => {

  expect(response.statusCode).to.eq(200);

  
})
 cy.contains('RBL TNG').should('exist')

 cy.contains('Zugübersicht').should('exist')

  cy.get("[data-cy='SvgArrowDown']").click()

  cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck3')

  cy.contains('Administration').click()

  cy.wait('@apiCheck3')

  cy.wait('@apiCheck3').then(({response}) => {

    expect(response.statusCode).to.eq(200);

    cy.contains('Administration/Rollen').should('exist')

    RoleCount = response.body.data.roles.length;

      cy.get("[data-cy='SvgEdit']").eq(RoleCount-1).click()

      cy.get("[data-cy='SvgDelete']").click()
                     
      cy.contains('Rolle löschen').click()

  

  })

                  
    cy.get("[data-cy='SvgArrowDown']").eq(0).click()
    
    cy.contains('Abmelden').click()
  
    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

})


/*
AK7 : The designation of a role must be unique in the system. The system does not allow the user to save a second role with the same name --> error message

AK8 : The ACAT ID of a role must be unique in the system. The system does not allow the user to save a second role with the same ACAT ID --> error message
Error Message : The role could not be saved. The AG group name or designation already exists in RBLTNG.


*/

it('AK7_AK8', () => {


 
    
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

  cy.wait('@apiCheck2').then(({response}) => {

  expect(response.statusCode).to.eq(200);

  
})
 cy.contains('RBL TNG').should('exist')

 cy.contains('Zugübersicht').should('exist')

  cy.get("[data-cy='SvgArrowDown']").click()

  cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck3')


  cy.contains('Administration').click()

  cy.wait('@apiCheck3')

  cy.wait('@apiCheck3').then(({response}) => {

    expect(response.statusCode).to.eq(200);

    cy.contains('Administration/Rollen').should('exist')

  
    RoleCount = response.body.data.roles.length;
  
    LastRoleName = (response.body.data.roles[RoleCount-1].name);
    Last_AD_GroupName = (response.body.data.roles[RoleCount-1].authGroupId);


    cy.contains('Rolle erstellen').click()

      // data-cy

      // data-cy

      Randno = Math.floor(Math.random() * 100000)

      cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(0).type('ZAutomation_AD_GroupName'+ Randno)

      cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(1).type(LastRoleName)


      cy.contains('Überwachen').click()

      cy.contains('Disponieren').click()

      cy.get("[data-cy='SvgCheck']").eq(0).click()

      cy.contains('The role is already stored.').should('exist')

      cy.get("[data-cy='SvgClose']").eq(1).click()


      cy.contains('Rolle erstellen').click()

      cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(0).type(Last_AD_GroupName)

      cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(1).type('ZAutomation_RoleName_'+ Randno)

      cy.contains('Überwachen').click()

      cy.contains('Disponieren').click()

      cy.get("[data-cy='SvgCheck']").eq(0).click()


      cy.contains('The role is already stored.').should('exist')

      cy.get("[data-cy='SvgClose']").eq(1).click()

    })
                
    cy.get("[data-cy='SvgArrowDown']").eq(0).click()
    
    cy.contains('Abmelden').click()
  
    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

})

  })

