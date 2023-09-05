describe('RBLTNG-2453', () => {


  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });


  var counttest

  var name = ""

  var Assignedcounttest

  var name2


 /* 
AK0: System shows the admin a list of control centers stored in the system (structure see Figma Link)
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

   cy.get("[data-cy='SvgArrowDown']").eq(0).click()

   cy.contains('Administration').click()

   cy.intercept({
     method: 'POST',
     path: '/api/v1'
   }).as('apiCheck3')

   cy.contains('Leitstellen').click()

   cy.wait('@apiCheck3').then(({response}) => {

  // add data-cy tags for the below class name 

   cy.get('.MuiTypography-root.MuiTypography-subtitle.css-eapax7').then((tr) => {
 
     counttest = tr.length;

     // check for number of Leitstelle Assigned to user
     cy.log(counttest-2)

     for (let i = 2; i < counttest; i++) {
       
         if (counttest == 2)
         {

           throw new Error('No Leitstelle assigned to the User')

         }
         else 
         {

          cy.log(tr[i].innerText)

         }
        }
        })
      })
      cy.get("[data-cy='SvgArrowDown']").eq(0).click()

      cy.contains('Abmelden').click()
    
      cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
     })

     /*
     AK1: Admin can select a control center and see the detail view of the control center
     Only one control center can be displayed in the detailed view
     Table with assigned operating locations
*/

     it('AK1', () => {

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
   
       cy.get("[data-cy='SvgArrowDown']").eq(0).click()
   
       cy.contains('Administration').click()
   
       cy.intercept({
         method: 'POST',
         path: '/api/v1'
       }).as('apiCheck3')
   
       cy.contains('Leitstellen').click()
   
       cy.wait('@apiCheck3').then(({response}) => {
   
      // add data-cy tags for the below class name 
  
       cy.get('.MuiTypography-root.MuiTypography-subtitle.css-eapax7').then((tr) => {
     
         counttest = tr.length;
   
         // check for number of Leitstelle Assigned to user
         cy.log(counttest-2)
   
         for (let i = 2; i < counttest; i++) {
           
             if (counttest == 2)
             {
   
               throw new Error('No Leitstelle assigned to the User')
   
             }
             else 
             {
   
              cy.log(tr[i].innerText)
   
             }
            }
            })
            cy.get("[data-cy='SvgArrowDown']").eq(1).click()

            cy.contains('RIL100').should('have.length',1)
      
          })
          cy.get("[data-cy='SvgArrowDown']").eq(0).click()
  
          cy.contains('Abmelden').click()
        
          cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
         })

      
/*
  AK2: In the detailed view, the admin can search for operational locations that are assigned

  AK15: Search
  The search can take place using the Ril100 name or the long name
  (selection , default is Ril100 ).
  Ril100: The search is implicitly set with a wildcard at the end, e.g. admin enters FF and the system searches for FF *
  Long name : The search is implicitly set with wildcards in front and at the end, e.g. admin enters FF and the system searches for * FF *
  Do not search case sensitive
  Search does not detect misspellings
  The searched string should be highlighted in the search results (applies to Ril100 and long name)
 
*/

     it('AK2_AK15', () => {

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
   
       cy.get("[data-cy='SvgArrowDown']").eq(0).click()
   
       cy.contains('Administration').click()
   
       cy.intercept({
         method: 'POST',
         path: '/api/v1'
       }).as('apiCheck3')
   
       cy.contains('Leitstellen').click()
   
       cy.wait('@apiCheck3').then(({response}) => {
   
      // add data-cy tags for the below class name 
  
       cy.get('.MuiTypography-root.MuiTypography-subtitle.css-eapax7').then((tr) => {
     
         counttest = tr.length;
   
         // check for number of Leitstelle Assigned to user
         cy.log(counttest-2)
   
         for (let i = 2; i < counttest; i++) {
           
             if (counttest == 2)
             {
   
               throw new Error('No Leitstelle assigned to the User')
   
             }
             else 
             {
   
              cy.log(tr[i].innerText)
   
             }
            }
            })
            cy.get("[data-cy='SvgArrowDown']").eq(1).click()

            cy.contains('RIL100').should('have.length',1)
      
            cy.get('[placeholder="Suche"]').eq(1).type('BALE')

            cy.contains('Berlin').should('exist')
      
         //   cy.get('.MuiOutlinedInput-root.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-hiddenLabel.css-1mdm1x8').click()
      
            cy.contains('RIL100').click()
            cy.contains('Langnamen').click()
      
            cy.get('.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.MuiInputBase-hiddenLabel.css-e6wx87').clear()
      
            cy.get('.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.MuiInputBase-hiddenLabel.css-e6wx87').type('Alexanderplatz')
      
            cy.contains('Alexanderplatz').should('exist')
      
            cy.get('.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.MuiInputBase-hiddenLabel.css-e6wx87').clear()
      
            cy.get('.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.MuiInputBase-hiddenLabel.css-e6wx87').type('Alexander')
      
            cy.contains('Alexanderplatz').should('exist')
      
            cy.get('.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.MuiInputBase-hiddenLabel.css-e6wx87').clear()
      
            cy.get('.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.MuiInputBase-hiddenLabel.css-e6wx87').type('lexander')
      
            cy.contains('Alexanderplatz').should('exist')
      
            cy.get('.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.MuiInputBase-hiddenLabel.css-e6wx87').clear()
      
            cy.get('.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.MuiInputBase-hiddenLabel.css-e6wx87').type('LExandER')
      
            cy.contains('Alexanderplatz').should('exist')

            cy.get('.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.MuiInputBase-hiddenLabel.css-e6wx87').clear()
      
            cy.get('.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.MuiInputBase-hiddenLabel.css-e6wx87').type('leAxander')
      
            cy.contains('Keine Einträge').should('exist')

            cy.contains('Alexanderplatz').should('not.exist')
      
          })

              
          cy.get("[data-cy='SvgArrowDown']").eq(0).click()
  
          cy.contains('Abmelden').click()
        
          cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')



        })


/*
 AK3: On the table, operating points that are assigned to more than the selected control centers should also be identified / additionally highlighted 
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
       cy.contains('Abw').should('exist')
   
       cy.contains('RBL TNG').should('exist')
   
       cy.contains('Zugübersicht').should('exist')
   
       cy.get("[data-cy='SvgArrowDown']").eq(0).click()
   
       cy.contains('Administration').click()
   
       cy.intercept({
         method: 'POST',
         path: '/api/v1'
       }).as('apiCheck3')
   
       cy.contains('Leitstellen').click()
   
       cy.wait('@apiCheck3').then(({response}) => {
   
      // add data-cy tags for the below class name 
  
       cy.get('.MuiTypography-root.MuiTypography-subtitle.css-eapax7').then((tr) => {
     
         counttest = tr.length;
   
         // check for number of Leitstelle Assigned to user
         cy.log(counttest-2)
   
         for (let i = 2; i < counttest; i++) {
           
             if (counttest == 2)
             {
   
               throw new Error('No Leitstelle assigned to the User')
   
             }
             else 
             {
   
              cy.log(tr[i].innerText)
   
             }
            }
            })
            cy.get("[data-cy='SvgArrowDown']").eq(1).click()

            cy.contains('RIL100').should('have.length',1)

            cy.get('.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiInputBase-adornedEnd.MuiInputBase-hiddenLabel.css-e6wx87').type('BALE')

            cy.contains('Berlin').should('exist')
      
            cy.get('[data-cy="SvgInfo"]').eq(0).trigger('mouseover')
                          
            cy.get('[role="tooltip"]').eq(0).then(elm => {

              const InnerText = elm[0].innerText;

              expect(InnerText).to.equal('Weitere Leitstelle(n)\nBerlin');             
    
             })
   
          })

              
          cy.get("[data-cy='SvgArrowDown']").eq(0).click()
  
          cy.contains('Abmelden').click()
        
          cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

        })



/*
 AK4:  System allows the admin to edit the control center

 AK5 : In the editing view, the operating points are displayed in 2 areas
    Assigned operating locations
    Unassigned sites

 AK6: Admin can remove a site within the list of assigned sites (assignment is removed).

    This removed site will then be highlighted in the unassigned sites area.

 AK8: Admin can add an operation point to the control center within the list of unassigned operation points (allocation is created).

 AK10 : Admin can either add or remove sites from the search result (depending on which list a + or - symbol is displayed)

 AK11: Admin can save the editing of the control center (via the save icon). System changes to AK1 .
*/


it('AK4_AK5_AK6_AK8_AK10_AK11', () => {

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

 cy.get("[data-cy='SvgArrowDown']").eq(0).click()

 cy.contains('Administration').click()

 cy.intercept({
   method: 'POST',
   path: '/api/v1'
 }).as('apiCheck3')

 cy.contains('Leitstellen').click()

 cy.wait('@apiCheck3').then(({response}) => {

// add data-cy tags for the below class name 

 cy.get('.MuiTypography-root.MuiTypography-subtitle.css-eapax7').then((tr) => {

   counttest = tr.length;


   cy.log(counttest-2)

   for (let i = 2; i < counttest; i++) {
     
       if (counttest == 2)
       {

         throw new Error('No Leitstelle assigned to the User')

       }
       else 
       {

        cy.log(tr[i].innerText)

       }
      }
      })

      cy.get("[data-cy='SvgEdit']").eq(0).click()

      cy.contains('Zugeordnete Betriebsstellen').should('exist')

      cy.contains('Nicht zugeordnete Betriebsstellen').should('exist')

      cy.get('[data-cy="SvgRemove"]').then((tr1) => {
 
        Assignedcounttest = tr1.length;
        
       
        cy.get('[data-cy="SvgAdd"]').eq(0).click()

        cy.get('[data-cy="SvgRemove"]').should('have.length',Assignedcounttest+1)

        cy.get('[data-cy="SvgRemove"]').eq(0).click()

        cy.get('[data-cy="SvgRemove"]').should('have.length',Assignedcounttest)

        cy.get('[data-cy="SvgCheck"]').click()

      })

    })

    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()
  
    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  })



/*
   AK9 : Admin can search for sites. The search result is always displayed in 2 parts. Assigned and unassigned sites (0-n sites).

*/
it('AK9', () => {

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

   cy.get("[data-cy='SvgArrowDown']").eq(0).click()

   cy.contains('Administration').click()

   cy.intercept({
     method: 'POST',
     path: '/api/v1'
   }).as('apiCheck3')

   cy.contains('Leitstellen').click()

   cy.wait('@apiCheck3').then(({response}) => {

  // add data-cy tags for the below class name 

   cy.get('.MuiTypography-root.MuiTypography-subtitle.css-eapax7').then((tr) => {
 
     counttest = tr.length;

  
     cy.log(counttest-2)

     for (let i = 2; i < counttest; i++) {
       
         if (counttest == 2)
         {

           throw new Error('No Leitstelle assigned to the User')

         }
         else 
         {

          cy.log(tr[i].innerText)

         }
        }
        })

        cy.get("[data-cy='SvgEdit']").eq(0).click()

        cy.contains('Zugeordnete Betriebsstellen').should('exist')
 
        cy.contains('Nicht zugeordnete Betriebsstellen').should('exist')
         
        cy.get('[placeholder="Suche"]').eq(1).type('ABCHG')

        cy.get('[data-cy="SvgAdd"]').click()

        cy.get('[data-cy="SvgRemove"]').click()

  
        cy.get('[aria-haspopup="listbox"]').eq(1).click()
  
        cy.contains('Langnamen').click()
  
        cy.get('[placeholder="Suche"]').eq(1).clear()
  
        cy.get('[placeholder="Suche"]').eq(1).type('Alexanderplatz')
  
        cy.contains('Alexanderplatz').should('exist')

        cy.contains('Keine Einträge').should('exist')

        cy.get('[placeholder="Suche"]').eq(1).clear()
  
        cy.get('[placeholder="Suche"]').eq(1).type('Alexander')
  
        cy.contains('Alexanderplatz').should('exist')

        cy.contains('Keine Einträge').should('exist')
  
        cy.get('[placeholder="Suche"]').eq(1).clear()
  
        cy.get('[placeholder="Suche"]').eq(1).type('lexander')
  
        cy.contains('Alexanderplatz').should('exist')

        cy.contains('Keine Einträge').should('exist')
  
        cy.get('[placeholder="Suche"]').eq(1).clear()
  
        cy.get('[placeholder="Suche"]').eq(1).type('LExandER')
  
        cy.contains('Alexanderplatz').should('exist')

        cy.contains('Keine Einträge').should('exist')

        cy.get('[placeholder="Suche"]').eq(1).clear()
  
        cy.get('[placeholder="Suche"]').eq(1).type('leAxander')

        cy.contains('Alexanderplatz').should('not.exist')
  
        cy.contains('Keine Einträge').should('exist')
  
      })

      

      cy.get("[data-cy='SvgArrowDown']").eq(0).click()

      cy.contains('Abmelden').click()
    
      cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

    })





/*   AK12 : Admin can create new control centers

*/

it('AK12', () => {

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

   cy.get("[data-cy='SvgArrowDown']").eq(0).click()

   cy.contains('Administration').click()

   cy.intercept({
     method: 'POST',
     path: '/api/v1'
   }).as('apiCheck3')

   cy.contains('Leitstellen').click()

   cy.wait('@apiCheck3').then(({response}) => {

  // add data-cy tags for the below class name 

   cy.get('.MuiTypography-root.MuiTypography-subtitle.css-eapax7').then((tr) => {
 
     counttest = tr.length;

  
     cy.log(counttest-2)

     for (let i = 2; i < counttest; i++) {
       
         if (counttest == 2)
         {

           throw new Error('No Leitstelle assigned to the User')

         }
         else 
         {

          cy.log(tr[i].innerText)

         }
        }
        })

        name = "ZAutomationTest"+Math.random()

        cy.log(name)
 
        cy.contains('Leitstelle erstellen').click()
 
        cy.contains('Zugeordnete Betriebsstellen').should('exist')
 
        cy.contains('Nicht zugeordnete Betriebsstellen').should('exist')


        // add data-cy tags for the below class name 
        cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(0).type(name)

        // add data-cy tags for the below class name 
 
        cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(1).type(name)
 

        // add data-cy tags for the below class name 
        cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(2).type(name)
 
        cy.get('[data-cy="SvgAdd"]').eq(0).click()
 
        cy.get('[data-cy="SvgCheck"]').click()
 
        cy.reload()
 
        cy.contains(name).should('exist')
       
  
      })

      

      cy.get("[data-cy='SvgArrowDown']").eq(0).click()

      cy.contains('Abmelden').click()
    
      cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

    })


    /*   AK13 : Admin CANNOT delete existing control centers - function should be implemented, but the delete button will be disabled

*/
it('AK13', () => {

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

   cy.get("[data-cy='SvgArrowDown']").eq(0).click()

   cy.contains('Administration').click()

   cy.intercept({
     method: 'POST',
     path: '/api/v1'
   }).as('apiCheck3')

   cy.contains('Leitstellen').click()

   cy.wait('@apiCheck3').then(({response}) => {

  // add data-cy tags for the below class name 

   cy.get('.MuiTypography-root.MuiTypography-subtitle.css-eapax7').then((tr) => {
 
     counttest = tr.length;

  
     cy.log(counttest-2)

     for (let i = 2; i < counttest; i++) {
       
         if (counttest == 2)
         {

           throw new Error('No Leitstelle assigned to the User')

         }
         else 
         {

          cy.log(tr[i].innerText)

         }
        }
        })

        cy.get("[data-cy='SvgEdit']").eq(0).click()

        cy.get('.css-1mxgqmq').should('be.disabled')

       cy.get('[data-cy="SvgCheck"]').click()
       
  
      })

      

      cy.get("[data-cy='SvgArrowDown']").eq(0).click()

      cy.contains('Abmelden').click()
    
      cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

    })

/*
  AK17: because of the ISTP interface (creating measures), an additional mandatory text field is required in the control center (ISTP ID)

  AK19: "AD group name" , "ISTP ID" and "control center name" must be unique , ie if a new control center is to receive an ID that already exists, then an error occurs

*/

  it('AK17_AK18', () => {

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
  
     cy.get("[data-cy='SvgArrowDown']").eq(0).click()
  
     cy.contains('Administration').click()
  
     cy.intercept({
       method: 'POST',
       path: '/api/v1'
     }).as('apiCheck3')
  
     cy.contains('Leitstellen').click()
  
     cy.wait('@apiCheck3').then(({response}) => {
  
    // add data-cy tags for the below class name 
  
     cy.get('.MuiTypography-root.MuiTypography-subtitle.css-eapax7').then((tr) => {
   
       counttest = tr.length;
      
       cy.log(counttest-2)
  
       for (let i = 2; i < counttest; i++) {
         
           if (counttest == 2)
           {
  
             throw new Error('No Leitstelle assigned to the User')
  
           }
           else 
           {
  
            cy.log(tr[i].innerText)
  
           }
          }
          })
  
          name = "ZAutomationTest"+Math.random()
  
          cy.log(name)
   
          cy.contains('Leitstelle erstellen').click()
   
          cy.contains('Zugeordnete Betriebsstellen').should('exist')
   
          cy.contains('Nicht zugeordnete Betriebsstellen').should('exist')
  
  
          // add data-cy tags for the below class name 
          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(0).type(name)
  
          // add data-cy tags for the below class name 
   
          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(1).type(name)
   
  
          // add data-cy tags for the below class name 
          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(2).type(name)
   
          cy.get('[data-cy="SvgAdd"]').eq(0).click()
   
          cy.get('[data-cy="SvgCheck"]').click()
   
          cy.reload()
   
          cy.contains(name).should('exist')

          name2 = "ZAutomationTest2"+Math.random()
              
          cy.contains('Leitstelle erstellen').click()

          cy.contains('Zugeordnete Betriebsstellen').should('exist')

          cy.contains('Nicht zugeordnete Betriebsstellen').should('exist')

          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(0).type(name)

          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(1).type(name2)

          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(2).type(name2)

          cy.get('[data-cy="SvgAdd"]').eq(0).click()

          cy.get('[data-cy="SvgCheck"]').click()

          cy.get('.MuiAlert-message').should('contain', 'The leitstelle is already stored.')

          cy.get("[data-cy='SvgClose']").eq(1).click()
              
          cy.contains('Leitstelle erstellen').click()

          cy.contains('Zugeordnete Betriebsstellen').should('exist')

          cy.contains('Nicht zugeordnete Betriebsstellen').should('exist')

          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(0).type(name2)

          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(1).type(name)

          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(2).type(name2)

          cy.get('[data-cy="SvgAdd"]').eq(0).click()

          cy.get('[data-cy="SvgCheck"]').click()

          cy.get('.MuiAlert-message').should('contain', 'The leitstelle is already stored.')

          cy.log('test')

          cy.get("[data-cy='SvgClose']").eq(1).click()

          cy.contains('Leitstelle erstellen').click()

          cy.contains('Zugeordnete Betriebsstellen').should('exist')

          cy.contains('Nicht zugeordnete Betriebsstellen').should('exist')

          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(0).type(name2)

          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(1).type(' ')

          cy.get('.MuiFilledInput-input.MuiInputBase-input.css-1l8mg7d').eq(2).type(name2)

          cy.get('[data-cy="SvgAdd"]').eq(0).click()

          cy.get('[data-cy="SvgCheck"]').trigger('mouseover')

          cy.get('[role="tooltip"]').eq(0).then(elm => {

            const InnerText = elm[0].innerText;

            expect(InnerText).to.equal('Eine Leitstelle muss einen Namen, ISTP ID, AD Gruppennamen und mindestens eine Betriebsstelle zugeordent haben');
            
    
           })

         
          cy.get('[data-cy="SvgCheck"]').click()

          cy.get('.MuiAlert-message').should('contain', '')

          cy.log('test2')
    
        })
  
        
  
        cy.get("[data-cy='SvgArrowDown']").eq(0).click()
  
        cy.contains('Abmelden').click()
      
        cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
  
      })

    

      })


