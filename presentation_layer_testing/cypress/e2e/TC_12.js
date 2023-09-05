describe('empty spec', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
      var Length = 0
      var RandomTrainPick = 0
      var Personnel = new Array();
  
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
  
  

  it('TC_122_124_Role_TelephonedetailsofLoggedinStaff', () => {

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

        Length = (response.body.data.trainOverview.length);
  
        RandomTrainPick = Math.floor(Math.random() * Length)

        cy.intercept({
                method: 'POST',
                path: '/api/v1'
              }).as('apiCheck3')

                          
            cy.get("[data-cy='SvgArrowRight']").eq(RandomTrainPick).click()   
  
        // cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-sizeMedium.css-ts71t2').eq(RandomTrainPick).click()

        cy.get('body').then($body => {
          if (($body.find('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb')).RandomTrainPick > 0)    
                 {     
                      cy.get('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb').eq(0).should('contain', 'Tf')
                      cy.get('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb').eq(1).should('contain', 'Z1')
                      cy.get('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb').eq(2).should('contain', 'Z2')
                      cy.get('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb').eq(3).should('contain', 'Bt')
                      cy.get('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb').eq(4).should('contain', 'DBS')
                  }
  
               else if (($body.find('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault.css-c0rjhb')).RandomTrainPick == 0) 
                  {     
                      cy.get('.MuiTypography-root.MuiTypography-body1.css-armg9x').should('contain', 'Keine eingebuchten Personale vorhanden')
                  }
  
        cy.wait('@apiCheck3').then(({response}) => {

        expect(response.statusCode).to.eq(200);

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


    })

    afterEach(() => {
    
      cy.get("[data-cy='SvgArrowDown']").eq(0).click()
  
      cy.contains('Abmelden').click()
  
      cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
    })
  
  })