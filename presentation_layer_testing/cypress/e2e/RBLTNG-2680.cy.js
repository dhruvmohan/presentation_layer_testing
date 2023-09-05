describe('RBLTNG-2680', () => {


  var counttest

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
  /*

   AK0: System allows the admin to display an existing control center within the scheduling areas tab (dropdown for control centers, list of scheduling areas)

  */

  it('AK0', () => {

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

     cy.contains('Abw').should('exist')
 
     cy.contains('RBL TNG').should('exist')
 
     cy.contains('Zugübersicht').should('exist')

     // data-cy need to be included

     cy.get('.MuiSelect-select').click()

     // data-cy need to be included

      cy.get(".MuiTypography-root.MuiTypography-body1.MuiListItemText-primary.css-bztwnb").then((tr) => {
       
      counttest = tr.length;
  
        // check for number of Dispobereich Assigned to Leitstelle

        cy.log(counttest)
  
        for (let i = 0; i < counttest; i++) {
          
            if (counttest == 0)
            {
                throw new Error('No Dispobereich assigned to this Leitstelle')
            }
            else 
            {
  
             cy.log(tr[i].innerText)
  
            }
           }
           })

           cy.get("[data-cy='SvgArrowDown']").eq(0).click({force: true})

           cy.contains('Abmelden').click()
         
           cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
         

  });
  
 /*
   AK1 : After selecting the control center, a list of the associated scheduling areas is displayed
   AK2: Admin can select a DsB and see the detailed view 
   Only one DsB can be displayed in the detailed view
AK5: System allows the admin to edit a new scheduling area within the selected control center 
AK6 : In the editing view, the lines are displayed in 2 areas
Associated Lines
Unassigned lines (always depending on the control center)
AK7: Admin can remove a line within the list of assigned lines (assignment will be removed). This newly removed line is then highlighted in the Unassigned Lines area
AK8: Admin can add a line to the DsB within the list of unassigned lines (allocation will be created). This newly added line is then highlighted in the Associated Line area.
AK9 : Admin can search for lines in edit view. The search result is always displayed in 2 parts. Assigned and unassigned lines (0-n always depending on the control center)). For details on the search, see AK-S
  */

  it('AK1_AK5_AK6_AK7_AK8_AK9 ', () => {

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

    cy.contains('Abw').should('exist')

    cy.contains('RBL TNG').should('exist')

    cy.contains('Zugübersicht').should('exist')

    cy.get("[data-cy='SvgArrowDown']").eq(0).click({force: true})

    cy.contains('Administration').click()

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck3')

    cy.contains('Dispositionsbereiche').click()

    cy.wait('@apiCheck3').then(({response}) => {

      expect(response.statusCode).to.eq(200);

    })

    cy.get('[data-testid="KeyboardArrowDownRoundedIcon"]').eq(1).click()

    cy.get('[role="combobox"]').type('Berlin').type('{downArrow}').type('{enter}')
    .then((tr) => {

      counttest = tr.length;

      // check for number of Leitstelle Assigned to user
      cy.log(counttest)

      for (let i = 0; i < counttest; i++) {
        
          if (counttest == 1)
          {

            throw new Error('No Dispobereich assigned to the User')

          }
          else 
          {

           cy.log(tr[i].innerText)

          }
         }
         })


    cy.contains('Test').should('exist')
      
    cy.get("[data-cy='SvgEdit']").eq(0).click()

    cy.contains('Zugeordnete Linien').should('exist')

    cy.contains('Nicht zugeordnete Linien').should('exist')

    cy.get('[data-cy="SvgRemove"]').then((tr1) => {
   
    Assignedcounttest = tr1.length;
    
 
      cy.get('[data-cy="SvgAdd"]').eq(0).click()

      cy.get('[data-cy="SvgRemove"]').should('have.length',Assignedcounttest+1)

      cy.get('[data-cy="SvgRemove"]').eq(0).click()

      cy.get('[data-cy="SvgRemove"]').should('have.length',Assignedcounttest)

      cy.get('[data-cy="SvgCheck"]').click()

    })

    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()
  
    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
  
    })


/*

AK4 : System allows the admin to create a new scheduling area within the selected control center (fields/design see figma link)

AK12 : System allows the admin to delete a new scheduling area within the selected control center

AK13: Operating points that are assigned to more than the selected control centers should also be marked/highlighted on the table/map
*/

it('AK4_AK12_AK13', () => {



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

   cy.contains('Abw').should('exist')

   cy.contains('RBL TNG').should('exist')

   cy.contains('Zugübersicht').should('exist')

   cy.get("[data-cy='SvgArrowDown']").eq(0).click({force: true})

   cy.contains('Administration').click()

   cy.intercept({
     method: 'POST',
     path: '/api/v1'
   }).as('apiCheck3')

   cy.contains('Dispositionsbereiche').click()

   cy.wait('@apiCheck3').then(({response}) => {

     expect(response.statusCode).to.eq(200);

   })

   cy.get('[data-testid="KeyboardArrowDownRoundedIcon"]').eq(1).click()

   cy.get('[role="combobox"]').type('Berlin').type('{downArrow}').type('{enter}');

   cy.contains('Test').should('exist')

   cy.contains('Dispositionsbereich anlegen').click()

   var name = "ZAutomationTest"+Math.random()

   cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').type(name)

   cy.get('[data-cy="SvgRemove"]').should('have.length',0)

   cy.get('[data-cy="SvgAdd"]').eq(0).click()
   
   cy.get('[data-cy="SvgAdd"]').eq(0).click()
   
   cy.get('[data-cy="SvgAdd"]').eq(0).click()

   cy.get('[data-cy="SvgRemove"]').should('have.length',3)

   cy.get('[data-cy="SvgCheck"]').click()

   cy.contains(name).should('exist')

   cy.get(".MuiTypography-root.MuiTypography-subtitle.css-eapax7").then((tr) => {
   
   Dispobereich = tr.length;
    
   cy.log(Dispobereich)

   cy.get("[data-cy='SvgEdit']").eq(Dispobereich-3).click()

   cy.get('[data-cy="SvgInfo"]').eq(0).trigger('mouseover')
                            
              cy.get('[role="tooltip"]').eq(0).then(elm => {

                const InnerText = elm[0].innerText;

                expect(InnerText).to.contain('Weitere Dispositionsbereiche');
                
        
               })

   cy.get("[data-cy='SvgDelete']").click()

   cy.contains('Dispositionsbereich löschen').click()

   cy.get("[data-cy='SvgArrowDown']").eq(0).click()

   cy.contains('Abmelden').click()
 
   cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  })
 
   })



})