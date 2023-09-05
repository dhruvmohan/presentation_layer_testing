describe('RBLTNG-870', () => {


  var Length

  var RandomTrainPick

  var Personnel

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
  /*

  DBS - DB Sicherheit (in ISTP as BSG - Bahnschutzgesellschaft, adopt new designation DBS in RBL) 
The roles are displayed by importance as listed above (1st Tf , 2nd Z1 , 3rd Z2, 4th BT , 5th DBS). By default, only the first 3 are visible. If additional roles are booked, these can be expanded. 
The role abbreviations and the call icon (see comment review 06/28/2022)  are explained with the tooltips.
If no staff are booked in on a train journey (or if booking in a region is generally not planned, such as with SBB), a corresponding text message is displayed.
  
*/

  it('AK', () => {
    
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

    cy.wait(10000)
  
    cy.wait('@apiCheck2') // discard
      
    cy.wait('@apiCheck2').then(({response}) => {
  
        expect(response.statusCode).to.eq(200);

        cy.contains('RBL TNG').should('exist')

        cy.contains('Zugübersicht').should('exist')

        Length = (response.body.data.trainOverview.length);
  
        RandomTrainPick = Math.floor(Math.random() * Length)

        cy.intercept({
                method: 'POST',
                path: '/api/v1'
              }).as('apiCheck3')


                          
            cy.get("[data-cy='SvgArrowRight']").eq(RandomTrainPick).click()   

            cy.wait(10000)

            cy.wait('@apiCheck3').then(({response}) => {

              expect(response.statusCode).to.eq(200);
  
        // cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-sizeMedium.css-ts71t2').eq(RandomTrainPick).click()

        // data-cy

        cy.get('body').then($body => {
          if (($body.find('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb')).RandomTrainPick > 0)    
                 {     

                  // data-cy


                      cy.get('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb').eq(0).should('contain', 'Tf')
                      cy.get('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb').eq(1).should('contain', 'Z1')
                      cy.get('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb').eq(2).should('contain', 'Z2')
                      cy.get('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb').eq(3).should('contain', 'Bt')
                      cy.get('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb').eq(4).should('contain', 'DBS')
                  }
  
                  // data-cy

               else if (($body.find('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb')).RandomTrainPick == 0) 
                  {     
                    // data-cy
                    
                      cy.get('.MuiTypography-root.MuiTypography-body1.css-ybsg9t').should('contain', 'Keine eingebuchten Personale vorhanden')
                  }
  


        cy.contains('Kundenfahrplan').should('exist')

        cy.contains('Betriebsfahrplan').should('exist')
  
        Personnel = ((response.body.data.trainDetail.personnel))
  
        if(Personnel != null)
                    {
                        cy.log(Personnel.length)
  
                        expect(Personnel[0].role.shorthand).equals('Tf');
                        expect(Personnel[1].role.shorthand).equals('Z1');
                        expect(Personnel[2].role.shorthand).equals('Z2');
                        expect(Personnel[3].role.shorthand).equals('Bt');
                        expect(Personnel[4].role.shorthand).equals('DBS');
                    }
          
                  })
                   
              })
   
        })

           cy.get("[data-cy='SvgArrowDown']").eq(0).click({force: true})

           cy.contains('Abmelden').click()
         
           cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
         

  });
  
 })